import Sanitizer from 'purify-html';

export default {
  install(Vue, options = {}) {
    const directiveName = options.directiveName || 'purify-html';
    const defaultSanitizer = new Sanitizer(options.allowedTags);
    const presetsList = {
      default: options.allowedTags,
      ...options.presets,
    };

    Vue.directive(directiveName, (el, binding) => {
      const presets = Object.keys(binding.modifiers);

      if (presets.length !== 0 && options.hasOwnProperty('presets')) {
        let rules = [];

        presets.forEach((presetName) => {
          if (presetsList[presetName] !== undefined) {
            rules = [...rules, ...presetsList[presetName]];
          }
        });

        const presetSanitizer = new Sanitizer(rules);

        el.innerHTML = presetSanitizer.sanitize(binding.value);
      } else {
        el.innerHTML = defaultSanitizer.sanitize(binding.value);
      }
    });
  },
};
