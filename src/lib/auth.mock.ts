export async function mockLogin(email: string, pass: string) {
    await new Promise(r => setTimeout(r, 500));
    return email.endsWith("@company.com") && pass.length >= 4;
  }
  export async function mockRecover(_email: string) {
    await new Promise(r => setTimeout(r, 600));
  }
  