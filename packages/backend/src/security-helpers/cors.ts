import cors from 'cors';

const whitelist: string[] = [
  'http://localhost:3000',
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
