import cors from 'cors';

const whitelist: string[] = [
  'http://localhost:3000',
  'https://mesto-app.website',
  'https://www.mesto-app.website',
];

const corsOptions = {
  origin(origin: any, callback: any) {
    if (whitelist.includes(origin) || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export default cors(corsOptions);
