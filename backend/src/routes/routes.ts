import { Express } from 'express';
import express from 'express'
import carrier from './carrier.ts';
import customer from './customer.ts';
import delivery from './delivery.ts';
import order from './order.ts';
import product from './product.ts';
import tracking from './tracking.ts';

export default function (app: Express) {
    app
        .use(express.json())
        .use('/customers',customer)
        .use('/carriers',carrier)
        .use('/products',product)
        .use('/orders',order)
        .use('/deliveries',delivery)
        .use('tracking', tracking)
}