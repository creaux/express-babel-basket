import express from 'express';
import { join } from 'path';

export default express.static(join(__dirname, '../public'));
