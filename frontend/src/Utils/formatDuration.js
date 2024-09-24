export const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000); // 1 minute = 60000 milliseconds
    const seconds = Math.floor((milliseconds % 60000) / 1000); // Get remaining seconds
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Ensure two-digit seconds
  };
  