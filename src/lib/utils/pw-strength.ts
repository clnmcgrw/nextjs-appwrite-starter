
// Check strength of password according to requirements

type DiversityType = 'lowercase' | 'uppercase' | 'symbol' | 'number'

type Rule = {
  regex: string
  message: DiversityType
}

type Result = {
  id: number;
  value: string;
  contains: DiversityType[]
  length: number;
}

type PasswordStrength = (password: string) => Result

// options for sensitivity & symbols
const DEFAULT_OPTIONS = [
  { id: 0, value: 'unsafe', minDiversity: 0, minLength: 0 },
  { id: 1, value: 'weak', minDiversity: 2, minLength: 6 },
  { id: 2, value: 'medium', minDiversity: 4, minLength: 8 },
  { id: 3, value: 'strong', minDiversity: 4, minLength: 10 },
];
const OWASP_SYMBOLS = "!\"#\$%&'\(\)\*\+,-\./:;<=>\?@\[\\\\\\]\^_`\{|\}~";
const symbols = OWASP_SYMBOLS;
const options = DEFAULT_OPTIONS;

// default export
const passwordStrength: PasswordStrength = (password: string) => {
  const passwordCopy = password || '';

  options[0].minDiversity = 0;
  options[0].minLength = 0;

  const rules: Rule[] = [
    { regex: '[a-z]', message: 'lowercase' },
    { regex: '[A-Z]', message: 'uppercase' },
    { regex: '[0-9]', message: 'number' },
  ];
  if (symbols) {
    rules.push({
      regex: `[${symbols}]`,
      message: 'symbol'
    });
  }

  const strength = {} as Result;
  
  strength.contains = rules
      .filter(rule => new RegExp(`${rule.regex}`).test(passwordCopy))
      .map(rule => rule.message);

  strength.length = passwordCopy.length;

  const fulfilledOptions = options
      .filter(option => strength.contains.length >= option.minDiversity)
      .filter(option => strength.length >= option.minLength)
      .sort((o1, o2) => o2.id - o1.id)
      .map(option => ({ id: option.id, value: option.value }));
  Object.assign(strength, fulfilledOptions[0]);
  
  return strength;
};

export default passwordStrength;
