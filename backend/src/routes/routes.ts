import { Express } from 'express';
import express from 'express'
import carrier from './carrier.ts';
import customer from './customer.ts';
import delivery from './delivery.ts';
import order from './order.ts';
import product from './product.ts';
import user from './user.ts';

export default function (app: Express) {
    app
        .use(express.json())
        .use('/user', user)
}