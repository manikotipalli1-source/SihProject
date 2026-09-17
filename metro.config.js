// Metro config for KrishiRakshak.
// Adds .tflite to the asset extensions so `require('../../assets/models/x.tflite')`
// bundles the model file as a binary asset (same mechanism used for images/fonts),
// which react-native-fast-tflite then loads via loadTensorflowModel().
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('tflite');

module.exports = config;
