import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from '../../utils/formatAmountInCurrency';

  describe('Component ResultBox', () => {
    
    it('should render without crashing', () => {
      render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
    
  const testCases = [
    { amount: 100, from: 'PLN', to: 'USD' },
    { amount: 20, from: 'USD', to: 'PLN' },
    { amount: 200, from: 'PLN', to: 'USD' },
    { amount: 345, from: 'USD', to: 'PLN' },
  ];
   
  for(const testObj of testCases){
    it('should render proper info about conversion when PLN -> USD', () => {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency(testObj.amount/3.5, 'USD')}`.replace(/\u00a0/g, ' '));
      cleanup();
    })
  }

  for(const testObj of testCases){
    it('should render proper info about conversion when USD -> PLN', () => {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'USD')} = ${formatAmountInCurrency(testObj.amount*3.5, 'PLN')}`.replace(/\u00a0/g, ' '));
      cleanup();
    })
  }

  for(const testObj of testCases){
    it('should render proper info about conversion when currency is equal', () => {
      render(<ResultBox from="PLN" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`${formatAmountInCurrency(testObj.amount, 'PLN')} = ${formatAmountInCurrency(testObj.amount, 'PLN')}`.replace(/\u00a0/g, ' '));
      cleanup();
    })
  }

  const testCasesLowerThanZero = [
    { amount: -1, from: 'PLN', to: 'USD' },
    { amount: -5, from: 'USD', to: 'PLN' },
    { amount: -50, from: 'PLN', to: 'USD' },
    { amount: -100, from: 'USD', to: 'PLN' },
  ];

  for(const wrongTestCase of testCasesLowerThanZero){
    it('should return Wrong Value...', () => {
      render(<ResultBox from={wrongTestCase.from} to={wrongTestCase.to} amount={wrongTestCase.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(`Wrong value...`);
      cleanup();
    });
  };




 
});