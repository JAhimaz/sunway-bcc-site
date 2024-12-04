export const TruncateAddress = (address: string, startNumber?: number, endNumber?: number) => {
  return `${address.substring(0, 
    startNumber ? startNumber : 6
  )}...${address.substring(address.length - (endNumber ? endNumber : 4), address.length)}`
}

