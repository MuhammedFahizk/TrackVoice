import axios from "axios";

export const scraptik = axios.create({
    baseURL: 'https://scraptik.p.rapidapi.com',
    headers: {
      'x-rapidapi-key': '482582397fmsh91d06c861a89babp10b56ejsn6c16f3379153', // Replace with your actual key
      'x-rapidapi-host': 'scraptik.p.rapidapi.com',
    },
  });