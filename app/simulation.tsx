import React, { useEffect } from "react";

const Simulation = ({
  benchmark,
  poolSizePass,
  poolSizeUSDT,
  priceOfPassTokens,
  priceMultiple,
}: {
  benchmark: number;
  poolSizePass: number;
  poolSizeUSDT: number;
  priceOfPassTokens: number;
  priceMultiple: number;
}) => {
  const [burnTokens, setBurnTokens] = React.useState(0);
  const [tokens, setTokens] = React.useState(poolSizePass);
  const [pool, setPool] = React.useState(poolSizeUSDT);
  const [tokenPrice, setTokenPrice] = React.useState(0);
  const [totalBurnTokens, setTotalBurnTokens] = React.useState(0);
  const [customerSpending, setCustomerSpending] = React.useState(0);
  const [numberOfBurns, setNumberOfBurns] = React.useState(0);
  const [lastBurnCustomerSpending, setLastBurnCustomerSpending] =
    React.useState(0);
  const [totalTokenPriceToBurn, setTotalTokenPriceToBurn] = React.useState(0);
  const [properties, setProperties] = React.useState<Property[]>([]);
  const simulate = () => {
    console.log("benchmark: " + benchmark);
    let updatedBurnTokens = 0;
    let updatedTokens = Number(poolSizePass);
    let updatedPool = Number(poolSizeUSDT);
    let updatedTokenPrice = Number(priceOfPassTokens);
    let updatedTotalBurnTokens = 0;
    let updatedCustomerSpending = 0;
    let updatedNumberOfBurns = 0;
    let updatedLastBurnCustomerSpending = 0;
    let updatedTotalTokenPriceToBurn = 0;

    while (updatedTokenPrice < priceMultiple * priceOfPassTokens) {
      updatedCustomerSpending += updatedTokenPrice / benchmark;
      updatedLastBurnCustomerSpending = updatedTokenPrice / benchmark;
      updatedBurnTokens = benchmark * updatedTokens;
      updatedTotalBurnTokens += updatedBurnTokens;
      updatedTokens -= updatedBurnTokens;
      updatedPool += updatedBurnTokens * updatedTokenPrice;
      updatedTokenPrice = updatedPool / updatedTokens;
      updatedNumberOfBurns += 1;
      updatedTotalTokenPriceToBurn += updatedTokenPrice;
      setTokens(updatedTokens);
      setPool(updatedPool);
    }

    setBurnTokens(updatedBurnTokens);
    setTokenPrice(updatedTokenPrice);
    setTotalBurnTokens(updatedTotalBurnTokens);
    setCustomerSpending(updatedCustomerSpending);
    setNumberOfBurns(updatedNumberOfBurns);
    setLastBurnCustomerSpending(updatedLastBurnCustomerSpending);
    setTotalTokenPriceToBurn(updatedTotalTokenPriceToBurn);

    let tempProperties = [
      { name: "Number of Burns", value: updatedNumberOfBurns },
      { name: "Customer Spending", value: updatedCustomerSpending },
      { name: "Last Burn Customer Spending", value: updatedLastBurnCustomerSpending },
      { name: "Total Token Price to Burn", value: updatedTotalTokenPriceToBurn },
    ];

    setProperties(tempProperties);
  };

  useEffect(() => {
    setTokens(poolSizePass);
    setPool(poolSizeUSDT);
  }, [poolSizePass, poolSizeUSDT]);

  return (
    <div className="px-4 py-6 md:px-8 md:py-10">
      <h2 className="text-2xl font-bold mb-4">Simulation Results:</h2>
      <div className="flex flex-col md:flex-row md:items-end md:mb-6">
        <div className="flex flex-col items-center mr-4">
          <div
            className="w-4 bg-blue-500"
            style={{ height: `${(tokens / (tokens + pool)) * 200}px` }}
          ></div>
          <p className="text-sm">Number of Tokens: {tokens}</p>
        </div>
        <div className="flex flex-col items-center mt-4 md:mt-0 md:ml-4">
          <div
            className="w-4 bg-green-500"
            style={{ height: `${(pool / (tokens + pool)) * 200}px` }}
          ></div>
          <p className="text-sm">$ Pool: {pool}</p>
        </div>
      </div>
      <AnimatedPrice finalPrice={tokenPrice} />
      <PropertyTable properties={properties} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => simulate()}
      >
        Simulate
      </button>
    </div>
  );
};

const AnimatedPrice = ({ finalPrice }: { finalPrice: number }) => {
  const [animationClass, setAnimationClass] = React.useState("");

  useEffect(() => {
    setAnimationClass("animate-bounce");
    setTimeout(() => {
      setAnimationClass("");
    }, 1000);
  }, [finalPrice]);

  return (
    <div className={`flex items-center justify-center ${animationClass} mb-4`}>
      <h2 className="text-xl font-bold mr-2">Final Price per Token:</h2>
      <div className="flex items-center">
        <p className="text-xl text-blue-500">{finalPrice}</p>
      </div>
    </div>
  );
};

type Property = {
  name: string;
  value: number;
};

type PropertyTableProps = {
  properties: Property[];
};

const PropertyTable: React.FC<PropertyTableProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {properties.map(({ name, value }) => (
        <div key={name} className="flex flex-col">
          <p className="font-bold mb-2">{name}</p>
          <p className="text-sm">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default Simulation;
