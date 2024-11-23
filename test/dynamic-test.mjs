/* global describe:false, it:false */
//THIS CAN ONLY BE RUN THROUGH MOCHA
import { chai } from '@environment-safe/chai';
import { indexToPoint, pointToIndex } from '../src/index.mjs';

const should = chai.should();

should.exist(indexToPoint);
should.exist(pointToIndex);

const testCases = [];

for (let order = 0; order <= 5; order += 1) {
    const n = Math.pow(2, order);
    for (let index = 0; index < n * n; index += 1) {
        testCases.push({index, order});
    }
}

describe('astral', ()=>{
    describe('astral inline client', ()=>{
        testCases.forEach(function(testCase, i) {
            it(
                `[roundtrip: indexToPoint/pointToIndex] order=${
                    testCase.order
                }, index=${
                    testCase.index
                }`, ()=>{
                    pointToIndex(
                        indexToPoint(testCase.index, 
                            testCase.order
                        ), 
                        testCase.order
                    ).should.equal(testCase.index);
                }
            );
        });
    });
});

