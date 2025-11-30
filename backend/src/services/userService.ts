// Very small demo store; replace with Prisma DB calls
type User = any;
const users = new Map<string, any>();
export const userService = {
  async getUserById(id:string){ return users.get(id) || null; },
  async createUser(data:any){ const id = 'user_'+Date.now(); const u = { id, ...data }; users.set(id,u); return u; },
  async updateBalance(userId:string, delta:number){ const u = users.get(userId); if(!u) throw new Error('NOT_FOUND'); u.balance = (u.balance||0)+delta; return u; }
};
