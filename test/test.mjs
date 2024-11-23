/* global describe:false */
import { chai } from '@environment-safe/chai';
import { it } from '@open-automaton/moka';
import { indexToPoint, construct } from '../src/index.mjs';

const should = chai.should();

should.exist(indexToPoint);

describe('astral', ()=>{
    describe('astral inline client', ()=>{
        it('[indexToPoint] order=0, index=0', () => {
            indexToPoint(0, 0).should.deep.equal({ x: 0, y: 0 });
        });
        
        it('[indexToPoint] order=1, index=0', () => {
            indexToPoint(0, 1).should.deep.equal({ x: 0, y: 0 });
        });
        
        it('[indexToPoint] order=1, index=1', () => {
            indexToPoint(1, 1).should.deep.equal({ x: 0, y: 1 });
        });
        
        it('[indexToPoint] order=1, index=2', () => {
            indexToPoint(2, 1).should.deep.equal({ x: 1, y: 1 });
        });
        
        it('[indexToPoint] order=1, index=3', () => {
            indexToPoint(3, 1).should.deep.equal({ x: 1, y: 0 });
        });
        
        it('[indexToPoint] order=2, index=0', () => {
            indexToPoint(0, 2).should.deep.equal({ x: 0, y: 0 });
        });
        
        it('[indexToPoint] order=2, index=1', () => {
            indexToPoint(1, 2).should.deep.equal({ x: 1, y: 0 });
        });
        
        it('[indexToPoint] order=2, index=2', () => {
            indexToPoint(2, 2).should.deep.equal({ x: 1, y: 1 });
        });
        
        it('[indexToPoint] order=2, index=3', () => {
            indexToPoint(3, 2).should.deep.equal({ x: 0, y: 1 });
        });
        
        it('[indexToPoint] order=2, index=4', () => {
            indexToPoint(4, 2).should.deep.equal({ x: 0, y: 2 });
        });
        
        it('[indexToPoint] order=2, index=5', () => {
            indexToPoint(5, 2).should.deep.equal({ x: 0, y: 3 });
        });
        
        it('[indexToPoint] order=2, index=6', () => {
            indexToPoint(6, 2).should.deep.equal({ x: 1, y: 3 });
        });
        
        it('[indexToPoint] order=2, index=7', () => {
            indexToPoint(7, 2).should.deep.equal({ x: 1, y: 2 });
        });
        
        it('[indexToPoint] order=2, index=8', () => {
            indexToPoint(8, 2).should.deep.equal({ x: 2, y: 2 });
        });
        
        it('[indexToPoint] order=2, index=9', () => {
            indexToPoint(9, 2).should.deep.equal({ x: 2, y: 3 });
        });
        
        it('[indexToPoint] order=2, index=10', () => {
            indexToPoint(10, 2).should.deep.equal({ x: 3, y: 3 });
        });
        
        it('[indexToPoint] order=2, index=11', () => {
            indexToPoint(11, 2).should.deep.equal({ x: 3, y: 2 });
        });
        
        it('[indexToPoint] order=2, index=12', () => {
            indexToPoint(12, 2).should.deep.equal({ x: 3, y: 1 });
        });
        
        it('[indexToPoint] order=2, index=13', () => {
            indexToPoint(13, 2).should.deep.equal({ x: 2, y: 1 });
        });
        
        it('[indexToPoint] order=2, index=14', () => {
            indexToPoint(14, 2).should.deep.equal({ x: 2, y: 0 });
        });
        
        it('[indexToPoint] order=2, index=15', () => {
            indexToPoint(15, 2).should.deep.equal({ x: 3, y: 0 });
        });
        
        it('[construct] order=0', () => {
            const data = [1];
            construct(data, 0).should.deep.equal([1]);
        });
        
        it('[construct] order=1', () => {
            const data = [1, 2, 3, 4];
            construct(data, 1).should.deep.equal([1, 4, 2, 3]);
        });
        
        it('[construct] order=2', () => {
            const data = Array.from({ length: 4 * 4 }, (_, i) => i + 1);
            construct(data, 2).should.deep.equal([
                1,
                2,
                15,
                16,
                4,
                3,
                14,
                13,
                5,
                8,
                9,
                12,
                6,
                7,
                10,
                11
            ]);
        });
    });
});

