module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],  // or 'module:metro-react-native-babel-preset' if not Expo
    plugins: [
      // ... any other plugins you have (e.g. nativewind/babel, module-resolver)
      'react-native-worklets/plugin',   // ← MUST be LAST in the plugins array!
    ],
  };
};