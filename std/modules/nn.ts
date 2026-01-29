/**
 * Neural Network Module - Neural Network Operations
 *
 * Provides operators for defining and executing neural networks.
 * Networks are defined as S-expressions and compiled to native code
 * by the Rust compiler for each target backend (PyTorch, TensorFlow, etc.).
 *
 * @packageDocumentation
 */

import type { StdOperatorMeta } from '../types.js';

/**
 * Neural network module operators.
 * These operators define network architecture and forward passes.
 */
export const NN_OPERATORS: Record<string, StdOperatorMeta> = {
  'nn/sequential': {
    module: 'nn',
    category: 'std-nn',
    minArity: 1,
    maxArity: null,
    description: 'Create a sequential neural network from layers',
    hasSideEffects: false,
    returnType: 'nn/module',
    params: [
      { name: '...layers', type: 'nn/layer[]', description: 'Layers to stack sequentially' },
    ],
    example: '["nn/sequential", ["nn/linear", 16, 64], ["nn/relu"], ["nn/linear", 64, 4]]',
  },
  'nn/linear': {
    module: 'nn',
    category: 'std-nn',
    minArity: 2,
    maxArity: 2,
    description: 'Fully connected linear layer (output = input * weights + bias)',
    hasSideEffects: false,
    returnType: 'nn/layer',
    params: [
      { name: 'inFeatures', type: 'number', description: 'Input dimension' },
      { name: 'outFeatures', type: 'number', description: 'Output dimension' },
    ],
    example: '["nn/linear", 16, 64] // 16 inputs -> 64 outputs',
  },
  'nn/relu': {
    module: 'nn',
    category: 'std-nn',
    minArity: 0,
    maxArity: 0,
    description: 'ReLU activation function: max(0, x)',
    hasSideEffects: false,
    returnType: 'nn/layer',
    params: [],
    example: '["nn/relu"]',
  },
  'nn/tanh': {
    module: 'nn',
    category: 'std-nn',
    minArity: 0,
    maxArity: 0,
    description: 'Tanh activation function: (e^x - e^-x) / (e^x + e^-x)',
    hasSideEffects: false,
    returnType: 'nn/layer',
    params: [],
    example: '["nn/tanh"]',
  },
  'nn/sigmoid': {
    module: 'nn',
    category: 'std-nn',
    minArity: 0,
    maxArity: 0,
    description: 'Sigmoid activation function: 1 / (1 + e^-x)',
    hasSideEffects: false,
    returnType: 'nn/layer',
    params: [],
    example: '["nn/sigmoid"]',
  },
  'nn/softmax': {
    module: 'nn',
    category: 'std-nn',
    minArity: 0,
    maxArity: 1,
    description: 'Softmax activation function (normalizes to probability distribution)',
    hasSideEffects: false,
    returnType: 'nn/layer',
    params: [
      { name: 'dim', type: 'number', description: 'Dimension to apply softmax', optional: true, defaultValue: -1 },
    ],
    example: '["nn/softmax"]',
  },
  'nn/dropout': {
    module: 'nn',
    category: 'std-nn',
    minArity: 0,
    maxArity: 1,
    description: 'Dropout layer for regularization (randomly zeros elements during training)',
    hasSideEffects: false,
    returnType: 'nn/layer',
    params: [
      { name: 'p', type: 'number', description: 'Dropout probability', optional: true, defaultValue: 0.5 },
    ],
    example: '["nn/dropout", 0.3] // 30% dropout',
  },
  'nn/batchnorm': {
    module: 'nn',
    category: 'std-nn',
    minArity: 1,
    maxArity: 1,
    description: 'Batch normalization layer',
    hasSideEffects: false,
    returnType: 'nn/layer',
    params: [
      { name: 'numFeatures', type: 'number', description: 'Number of features to normalize' },
    ],
    example: '["nn/batchnorm", 64]',
  },
  'nn/layernorm': {
    module: 'nn',
    category: 'std-nn',
    minArity: 1,
    maxArity: 1,
    description: 'Layer normalization',
    hasSideEffects: false,
    returnType: 'nn/layer',
    params: [
      { name: 'normalizedShape', type: 'number | number[]', description: 'Shape to normalize over' },
    ],
    example: '["nn/layernorm", 64]',
  },
  'nn/forward': {
    module: 'nn',
    category: 'std-nn',
    minArity: 2,
    maxArity: 2,
    description: 'Execute forward pass through network',
    hasSideEffects: false,
    returnType: 'tensor',
    params: [
      { name: 'module', type: 'nn/module', description: 'The neural network module' },
      { name: 'input', type: 'tensor', description: 'Input tensor' },
    ],
    example: '["nn/forward", "@entity.architecture", "@entity.sensors"]',
  },
  'nn/getWeights': {
    module: 'nn',
    category: 'std-nn',
    minArity: 1,
    maxArity: 1,
    description: 'Get network weights as a flat tensor',
    hasSideEffects: false,
    returnType: 'tensor',
    params: [
      { name: 'module', type: 'nn/module', description: 'The neural network module' },
    ],
    example: '["nn/getWeights", "@entity.architecture"]',
  },
  'nn/setWeights': {
    module: 'nn',
    category: 'std-nn',
    minArity: 2,
    maxArity: 2,
    description: 'Set network weights from a flat tensor',
    hasSideEffects: true,
    returnType: 'nn/module',
    params: [
      { name: 'module', type: 'nn/module', description: 'The neural network module' },
      { name: 'weights', type: 'tensor', description: 'New weights as flat tensor' },
    ],
    example: '["nn/setWeights", "@entity.architecture", "@payload.newWeights"]',
  },
  'nn/paramCount': {
    module: 'nn',
    category: 'std-nn',
    minArity: 1,
    maxArity: 1,
    description: 'Get total number of trainable parameters',
    hasSideEffects: false,
    returnType: 'number',
    params: [
      { name: 'module', type: 'nn/module', description: 'The neural network module' },
    ],
    example: '["nn/paramCount", "@entity.architecture"] // => 3300',
  },
  'nn/clone': {
    module: 'nn',
    category: 'std-nn',
    minArity: 1,
    maxArity: 1,
    description: 'Create a deep copy of the network with same weights',
    hasSideEffects: false,
    returnType: 'nn/module',
    params: [
      { name: 'module', type: 'nn/module', description: 'The neural network module to clone' },
    ],
    example: '["nn/clone", "@entity.architecture"]',
  },
};

/**
 * Get all nn operator names.
 */
export function getNnOperators(): string[] {
  return Object.keys(NN_OPERATORS);
}
