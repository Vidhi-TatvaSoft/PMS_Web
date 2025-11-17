export function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ');
  for (let c of cookies) {
    const [key, value] = c.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
