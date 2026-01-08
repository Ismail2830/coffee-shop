'use client';

import { useState, useRef, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

interface Prediction {
  className: string;
  probability: number;
}

interface DrinkAnalysis {
  type: 'hot' | 'cold' | 'unknown';
  confidence: number;
  detectedItem: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: {
    name: string;
  };
}

export default function DrinkRecognitionChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [drinkAnalysis, setDrinkAnalysis] = useState<DrinkAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hot drinks keywords - extensive list
  const hotDrinks = [
    'coffee', 'espresso', 'cappuccino', 'latte', 'mocha', 'macchiato',
    'americano', 'flat white', 'cortado', 'ristretto', 'lungo',
    'affogato', 'irish coffee', 'turkish coffee', 'french press',
    'cafe au lait', 'coffee cup', 'coffee mug', 'black coffee',
    'tea', 'green tea', 'black tea', 'herbal tea', 'chai', 'matcha',
    'oolong', 'white tea', 'earl grey', 'chamomile', 'peppermint tea',
    'jasmine tea', 'tea pot', 'tea cup', 'teacup', 'teapot',
    'hot chocolate', 'cocoa', 'hot cocoa', 'chocolate drink', 'drinking chocolate',
    'cup', 'mug', 'coffee cup', 'tea cup', 'ceramic cup', 'porcelain cup',
    'thermos', 'flask', 'travel mug', 'insulated cup', 'tumbler',
    'pot', 'kettle', 'teapot', 'coffee pot', 'percolator', 'carafe',
    'steam', 'steaming', 'hot beverage', 'warm drink', 'hot drink',
    'espresso machine', 'coffee maker', 'brew', 'brewing'
  ];

  // Cold drinks keywords - extensive list
  const coldDrinks = [
    'iced coffee', 'iced latte', 'iced mocha', 'iced americano',
    'cold brew', 'cold brew coffee', 'nitro coffee', 'iced espresso',
    'iced tea', 'iced green tea', 'iced black tea', 'sweet tea',
    'frappe', 'frappuccino', 'frozen drink', 'frozen coffee',
    'frozen latte', 'slushie', 'slush', 'granita', 'frozen',
    'milkshake', 'shake', 'smoothie', 'protein shake', 'fruit smoothie',
    'berry smoothie', 'banana smoothie', 'green smoothie',
    'juice', 'orange juice', 'apple juice', 'fruit juice', 'vegetable juice',
    'lemonade', 'limeade', 'cranberry juice', 'grape juice', 'pineapple juice',
    'grapefruit juice', 'tomato juice', 'carrot juice', 'fresh juice',
    'soda', 'pop', 'soft drink', 'cola', 'coke', 'pepsi', 'sprite',
    'carbonated', 'fizzy drink', 'sparkling water', 'tonic', 'ginger ale',
    'root beer', 'cream soda', 'seltzer', 'club soda',
    'beer', 'lager', 'ale', 'pilsner', 'stout', 'ipa', 'craft beer',
    'wine', 'red wine', 'white wine', 'rose wine', 'champagne', 'prosecco',
    'cocktail', 'margarita', 'mojito', 'martini', 'daiquiri', 'pina colada',
    'bloody mary', 'cosmopolitan', 'manhattan', 'old fashioned', 'whiskey sour',
    'vodka', 'rum', 'tequila', 'gin', 'whiskey', 'bourbon', 'scotch',
    'liquor', 'spirits', 'mixed drink', 'alcoholic beverage',
    'water', 'water bottle', 'bottled water', 'mineral water', 'spring water',
    'drinking water', 'ice water', 'chilled water', 'cold water',
    'milk', 'chocolate milk', 'skim milk', 'whole milk', 'almond milk',
    'soy milk', 'oat milk', 'dairy', 'buttermilk',
    'sports drink', 'energy drink', 'gatorade', 'powerade', 'red bull',
    'iced drink', 'cold beverage', 'chilled drink', 'refreshment',
    'glass', 'drinking glass', 'pint glass', 'wine glass', 'beer glass',
    'bottle', 'can', 'plastic bottle', 'glass bottle', 'aluminum can',
    'pitcher', 'jug', 'carafe', 'decanter', 'flask',
    'straw', 'drinking straw', 'ice cube', 'ice', 'iced', 'chilled',
    'refrigerator', 'cooler', 'ice bucket', 'condensation'
  ];

  const analyzeDrinkType = (predictions: Prediction[]): DrinkAnalysis => {
    if (predictions.length === 0) {
      return { type: 'unknown', confidence: 0, detectedItem: 'No drink detected' };
    }

    const topPrediction = predictions[0];
    const className = topPrediction.className.toLowerCase();

    // Check for cold drinks first (more specific)
    for (const coldDrink of coldDrinks) {
      if (className.includes(coldDrink)) {
        return {
          type: 'cold',
          confidence: topPrediction.probability,
          detectedItem: topPrediction.className
        };
      }
    }

    // Check for hot drinks
    for (const hotDrink of hotDrinks) {
      if (className.includes(hotDrink)) {
        return {
          type: 'hot',
          confidence: topPrediction.probability,
          detectedItem: topPrediction.className
        };
      }
    }

    return {
      type: 'unknown',
      confidence: topPrediction.probability,
      detectedItem: topPrediction.className
    };
  };

  // Dummy product data for testing
  const dummyProducts: Product[] = [
    {
      id: '1',
      name: 'Classic Espresso',
      description: 'Rich and bold espresso shot',
      price: 3.50,
      category: { name: 'Hot Coffee' }
    },
    {
      id: '2',
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and foam',
      price: 4.50,
      category: { name: 'Hot Coffee' }
    },
    {
      id: '3',
      name: 'Caramel Latte',
      description: 'Smooth latte with caramel syrup',
      price: 5.00,
      category: { name: 'Hot Coffee' }
    },
    {
      id: '4',
      name: 'Hot Chocolate',
      description: 'Rich chocolate with whipped cream',
      price: 4.00,
      category: { name: 'Hot Beverages' }
    },
    {
      id: '5',
      name: 'Iced Latte',
      description: 'Chilled espresso with cold milk',
      price: 5.00,
      category: { name: 'Iced Coffee' }
    },
    {
      id: '6',
      name: 'Cold Brew',
      description: 'Smooth cold-brewed coffee',
      price: 4.50,
      category: { name: 'Iced Coffee' }
    },
    {
      id: '7',
      name: 'Iced Mocha',
      description: 'Chocolate and espresso over ice',
      price: 5.50,
      category: { name: 'Iced Coffee' }
    },
    {
      id: '8',
      name: 'Berry Smoothie',
      description: 'Mixed berries blended with yogurt',
      price: 6.00,
      category: { name: 'Cold Beverages' }
    }
  ];

  const fetchRecommendations = async (drinkType: 'hot' | 'cold' | 'unknown') => {
    // If drink type is unknown, return empty array (no recommendations)
    if (drinkType === 'unknown') {
      return [];
    }
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    let filtered = dummyProducts;
    
    if (drinkType === 'hot') {
      // Filter hot drinks
      filtered = dummyProducts.filter(p => 
        p.category.name.toLowerCase().includes('hot') ||
        (p.category.name.toLowerCase().includes('coffee') && !p.name.toLowerCase().includes('iced'))
      );
    } else if (drinkType === 'cold') {
      // Filter cold drinks
      filtered = dummyProducts.filter(p => 
        p.category.name.toLowerCase().includes('iced') ||
        p.category.name.toLowerCase().includes('cold') ||
        p.name.toLowerCase().includes('iced') ||
        p.name.toLowerCase().includes('smoothie')
      );
    }
    
    // Return top 3 products for chatbot
    return filtered.slice(0, 3);
  };

  const getRecommendations = (drinkType: 'hot' | 'cold' | 'unknown'): string[] => {
    if (drinkType === 'hot') {
      return [
        '☕ Classic Espresso - Perfect for a quick energy boost',
        '🍵 Matcha Latte - Smooth and creamy green tea delight',
        '🍫 Hot Chocolate - Rich and comforting cocoa drink',
        '☕ Cappuccino - Velvety foam with bold espresso'
      ];
    } else if (drinkType === 'cold') {
      return [
        '🧊 Iced Caramel Latte - Sweet and refreshing coffee treat',
        '🍋 Fresh Lemonade - Zesty and thirst-quenching',
        '🥤 Berry Smoothie - Packed with fruits and vitamins',
        '❄️ Cold Brew Coffee - Smooth and less acidic coffee'
      ];
    } else {
      return [
        '☕ Signature Latte - Our house specialty',
        '🍵 Green Tea - Healthy and revitalizing',
        '🥤 Fruit Smoothie - Fresh and nutritious',
        '🧊 Iced Americano - Simple and refreshing'
      ];
    }
  };

  // Load the MobileNet model when component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelLoading(true);
        await tf.ready();
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        setModelLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
        setModelLoading(false);
      }
    };

    loadModel();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
        setPredictions([]);
        setDrinkAnalysis(null);
        setRecommendations([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const classifyImage = async () => {
    if (!model || !imageRef.current) {
      alert('Model not loaded or no image selected');
      return;
    }

    try {
      setIsLoading(true);
      setPredictions([]);
      setDrinkAnalysis(null);
      setRecommendations([]);

      const results = await model.classify(imageRef.current);
      setPredictions(results);
      
      const analysis = analyzeDrinkType(results);
      setDrinkAnalysis(analysis);
      
      // Fetch real recommendations from menu
      const recs = await fetchRecommendations(analysis.type);
      setRecommendations(recs);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error classifying image:', error);
      setIsLoading(false);
      alert('Error classifying image. Please try again.');
    }
  };

  const clearImage = () => {
    setImageUrl(null);
    setPredictions([]);
    setDrinkAnalysis(null);
    setRecommendations([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-[#8b6f47] hover:bg-[#6d5638] text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 z-50"
          aria-label="Open Drink Analyzer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-[#8b6f47] to-[#6d5638] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="font-bold text-lg">Drink Analyzer AI Zakariae Idea</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 max-h-150 overflow-y-auto">
            {modelLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b6f47] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading AI model...</p>
              </div>
            )}

            {!modelLoading && !imageUrl && (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">☕</div>
                <p className="text-gray-700 mb-4">Upload a drink image to analyze</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="chatbot-file-input"
                />
                <label
                  htmlFor="chatbot-file-input"
                  className="inline-block bg-[#8b6f47] hover:bg-[#6d5638] text-white px-6 py-3 rounded-lg cursor-pointer transition-colors"
                >
                  Choose Image
                </label>
              </div>
            )}

            {imageUrl && (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Selected drink"
                    className="w-full rounded-lg shadow-lg"
                    crossOrigin="anonymous"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={classifyImage}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#8b6f47] hover:bg-[#6d5638] text-white'
                  }`}
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Drink'}
                </button>

                {drinkAnalysis && (
                  <>
                    <div className={`rounded-lg p-4 text-center ${
                      drinkAnalysis.type === 'hot' 
                        ? 'bg-linear-to-br from-orange-500 to-red-600' 
                        : drinkAnalysis.type === 'cold'
                        ? 'bg-linear-to-br from-blue-500 to-cyan-600'
                        : 'bg-linear-to-br from-gray-500 to-gray-700'
                    }`}>
                      <div className="text-5xl mb-2">
                        {drinkAnalysis.type === 'hot' ? '☕' : drinkAnalysis.type === 'cold' ? '🧊' : '❓'}
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-1">
                        {drinkAnalysis.type === 'hot' 
                          ? 'HOT DRINK' 
                          : drinkAnalysis.type === 'cold'
                          ? 'COLD DRINK'
                          : 'NOT A DRINK'}
                      </h4>
                      <p className="text-sm text-white/90 mb-2">
                        {drinkAnalysis.detectedItem}
                      </p>
                      <div className="bg-white/20 rounded py-1 px-3 inline-block">
                        <span className="text-white text-sm font-semibold">
                          {(drinkAnalysis.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-linear-to-br from-[#f5f3ee] to-[#e8dcc8] rounded-lg p-3 mt-3">
                      <a href="/menu" className="flex items-center gap-2 mb-2 hover:opacity-80 transition-opacity group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8b6f47] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <h5 className="text-sm font-bold text-[#8b6f47] group-hover:text-[#6d5638] transition-colors">From Our Menu →</h5>
                      </a>
                      <div className="space-y-2">
                        {recommendations.length > 0 ? (
                          recommendations.map((product) => (
                            <a
                              key={product.id}
                              href={`/menu/${product.id}`}
                              className="bg-white rounded-lg p-3 hover:shadow-md transition-all border border-[#8b6f47]/20 hover:border-[#8b6f47]/50 block"
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-[#1a0f0a] text-sm">{product.name}</span>
                                
                              </div>
                              {product.description && (
                                <p className="text-gray-600 text-xs mb-1">{product.description}</p>
                              )}
                              <span className="bg-[#8b6f47]/10 text-[#8b6f47] text-xs font-semibold px-2 py-0.5 rounded">
                                {product.category.name}
                              </span>
                            </a>
                          ))
                        ) : (
                          getRecommendations(drinkAnalysis.type).map((recommendation, index) => (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-3 text-xs text-gray-700 hover:shadow-md transition-shadow border border-[#8b6f47]/20"
                            >
                              {recommendation}
                            </div>
                          ))
                        )}
                      </div>
                      <div className="mt-3 text-center">
                        <a 
                          href="/menu"
                          className="inline-block text-xs font-semibold text-[#8b6f47] hover:text-[#6d5638] underline"
                        >
                          View Full Menu →
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {predictions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase">Top Predictions:</p>
                    {predictions.slice(0, 3).map((prediction, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 rounded p-2 flex justify-between items-center text-sm"
                      >
                        <span className="font-medium text-gray-800">{prediction.className}</span>
                        <span className="text-[#8b6f47] font-bold">
                          {(prediction.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
