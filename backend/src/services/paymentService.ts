import { config } from '../config';
import { transactionService } from './transactionService';
import { countryWhitelistService } from './countryWhitelistService';
import { userService } from './userService';
export interface PaymentProvider { processDeposit(amount:number,currency:string,userId:string):Promise<any>; processWithdrawal(amount:number,currency:string,userId:string):Promise<any>; }
export class PlayMoneyProvider implements PaymentProvider {
  async processDeposit(amount:number,currency:string,userId:string){
    await userService.updateBalance(userId, amount);
    return { success:true, transactionId:`play_money_${Date.now()}` };
  }
  async processWithdrawal(amount:number,currency:string,userId:string){
    const user = await userService.getUserById(userId);
    if(!user || user.balance < amount) return { success:false, error:'INSUFFICIENT_FUNDS' };
    await userService.updateBalance(userId, -amount);
    return { success:true, transactionId:`play_money_${Date.now()}` };
  }
}
export class PaymentService {
  private getProvider(){ return config.playMoneyMode ? new PlayMoneyProvider() : new PlayMoneyProvider(); }
  async processDeposit(amount:number,currency:string,userId:string,userCountry:string){
    const isAllowed = await countryWhitelistService.isCountryAllowed(userCountry);
    if(!isAllowed) throw new Error('Deposits not allowed from your country');
    const user = await userService.getUserById(userId);
    if(user?.kycStatus !== 'APPROVED') throw new Error('KYC required');
    const provider = this.getProvider();
    const result = await provider.processDeposit(amount,currency,userId);
    if(result.success) await transactionService.createTransaction({ userId, type:'DEPOSIT', amount, currency, status:'COMPLETED', providerId:result.transactionId });
    return result;
  }
  async processWithdrawal(amount:number,currency:string,userId:string,userCountry:string){
    const isAllowed = await countryWhitelistService.isCountryAllowed(userCountry);
    if(!isAllowed) throw new Error('Withdrawals not allowed from your country');
    const user = await userService.getUserById(userId);
    if(user?.kycStatus !== 'APPROVED') throw new Error('KYC required');
    const provider = this.getProvider();
    const result = await provider.processWithdrawal(amount,currency,userId);
    if(result.success) await transactionService.createTransaction({ userId, type:'WITHDRAWAL', amount, currency, status:'COMPLETED', providerId:result.transactionId });
    return result;
  }
}
export const paymentService = new PaymentService();
