import 'should';
import {Encoder, Levels, Types} from './qr-node';

describe('Encoder', () => {
  'use strict';

  it('exist', (done: Function) => {
    Encoder.encode.should.not.be.type(Function);
    done();
  });

  it('encode return Buffer', (done: Function) => {
    Encoder.encode('test').then((data) => {
      data.toString().should.be.type('string');
      done();
    }, (error) => {
      done(error);
    });
  });

  it('encode foreground color is red', (done: Function) => {
    Encoder.encode('test', null, {foreground_color: '#ff0000'}).then((data) => {
      data.toString().should.be.type('string');
      done();
    }, (error) => {
      done(error);
    });
  });

  it('encode background color is transparent', (done: Function) => {
    Encoder.encode('test', null, {background_color: '#00000000'}).then((data) => {
      data.toString().should.be.type('string');
      done();
    }, (error) => {
      done(error);
    });
  });

  it('encode level is high', (done: Function) => {
    Encoder.encode('test', 'www/build/test.png', {level: Levels.HIGH}).then(() => {
      done();
    }, (error) => {
      done(error);
    });
  });

  it('encode type is svg', (done: Function) => {
    Encoder.encode('test', 'www/build/test.svg', {type: Types.SVG}).then(() => {
      done();
    }, (error) => {
      done(error);
    });
  });
});