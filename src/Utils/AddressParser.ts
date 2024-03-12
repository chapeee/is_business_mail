function extractDomain(email: string): string {
    return email.replace(/.*@/, "");
  }
  
  export default extractDomain;
  