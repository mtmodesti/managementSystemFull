export function isUserRegistered(user: any, db: any[]) {
  return db.find(
    (item) => item.password === user.password && item.email === user.email
  );
}
