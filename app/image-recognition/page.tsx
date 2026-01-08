'use client';

import { useState, useRef, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

export default function ImageRecognitionPage() {
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
    // Coffee types
    'coffee', 'espresso', 'cappuccino', 'latte', 'mocha', 'macchiato',
    'americano', 'flat white', 'cortado', 'ristretto', 'lungo',
    'affogato', 'irish coffee', 'turkish coffee', 'french press',
    'cafe au lait', 'coffee cup', 'coffee mug', 'black coffee',
    
    // Tea types
    'tea', 'green tea', 'black tea', 'herbal tea', 'chai', 'matcha',
    'oolong', 'white tea', 'earl grey', 'chamomile', 'peppermint tea',
    'jasmine tea', 'tea pot', 'tea cup', 'teacup', 'teapot',
    
    // Hot chocolate and cocoa
    'hot chocolate', 'cocoa', 'hot cocoa', 'chocolate drink', 'drinking chocolate',
    
    // Containers for hot drinks
    'cup', 'mug', 'coffee cup', 'tea cup', 'ceramic cup', 'porcelain cup',
    'thermos', 'flask', 'travel mug', 'insulated cup', 'tumbler',
    'pot', 'kettle', 'teapot', 'coffee pot', 'percolator', 'carafe',
    
    // Hot drink characteristics
    'steam', 'steaming', 'hot beverage', 'warm drink', 'hot drink',
    'espresso machine', 'coffee maker', 'brew', 'brewing'
  ];

  // Cold drinks keywords - extensive list
  const coldDrinks = [
    // Iced coffee and tea
    'iced coffee', 'iced latte', 'iced mocha', 'iced americano',
    'cold brew', 'cold brew coffee', 'nitro coffee', 'iced espresso',
    'iced tea', 'iced green tea', 'iced black tea', 'sweet tea', 'Granny Smith',
    
    // Frozen/blended drinks
    'frappe', 'frappuccino', 'frozen drink', 'frozen coffee',
    'frozen latte', 'slushie', 'slush', 'granita', 'frozen',
    
    // Milkshakes and smoothies
    'milkshake', 'shake', 'smoothie', 'protein shake', 'fruit smoothie',
    'berry smoothie', 'banana smoothie', 'green smoothie',
    
    // Juices
    'juice', 'orange juice', 'apple juice', 'fruit juice', 'vegetable juice',
    'lemonade', 'limeade', 'cranberry juice', 'grape juice', 'pineapple juice',
    'grapefruit juice', 'tomato juice', 'carrot juice', 'fresh juice',
    
    // Sodas and carbonated drinks
    'soda', 'pop', 'soft drink', 'cola', 'coke', 'pepsi', 'sprite',
    'carbonated', 'fizzy drink', 'sparkling water', 'tonic', 'ginger ale',
    'root beer', 'cream soda', 'seltzer', 'club soda',
    
    // Alcoholic drinks
    'beer', 'lager', 'ale', 'pilsner', 'stout', 'ipa', 'craft beer',
    'wine', 'red wine', 'white wine', 'rose wine', 'champagne', 'prosecco',
    'cocktail', 'margarita', 'mojito', 'martini', 'daiquiri', 'pina colada',
    'bloody mary', 'cosmopolitan', 'manhattan', 'old fashioned', 'whiskey sour',
    'vodka', 'rum', 'tequila', 'gin', 'whiskey', 'bourbon', 'scotch',
    'liquor', 'spirits', 'mixed drink', 'alcoholic beverage',
    
    // Water and other cold drinks
    'water', 'water bottle', 'bottled water', 'mineral water', 'spring water',
    'drinking water', 'ice water', 'chilled water', 'cold water',
    'milk', 'chocolate milk', 'skim milk', 'whole milk', 'almond milk',
    'soy milk', 'oat milk', 'dairy', 'buttermilk',
    'sports drink', 'energy drink', 'gatorade', 'powerade', 'red bull',
    'iced drink', 'cold beverage', 'chilled drink', 'refreshment',
    
    // Cold drink containers and characteristics
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
    
    // Return top 4 products
    return filtered.slice(0, 4);
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

      // Classify the image
      const results = await model.classify(imageRef.current);
      setPredictions(results);
      
      // Analyze if it's a hot or cold drink
      const analysis = analyzeDrinkType(results);
      setDrinkAnalysis(analysis);
      
      // Fetch recommendations from menu
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#e8dcc8]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-linear-to-br from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Coffee &amp; Drink Analyzer
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Upload a drink image - We&apos;ll tell you if it&apos;s Hot ☕ or Cold 🧊
            </p>
            {modelLoading && (
              <p className="text-yellow-400 mt-4">Loading AI model, please wait...</p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Upload Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1a0f0a] mb-4">
                Upload an Image
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1 px-4 py-3 border-2 border-[#8b6f47] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6f47]"
                  disabled={modelLoading}
                />
                {imageUrl && (
                  <button
                    onClick={clearImage}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Image Preview */}
            {imageUrl && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#1a0f0a] mb-4">
                  Selected Image
                </h3>
                <div className="flex justify-center mb-6">
                  <img
                    ref={imageRef}
                    src={imageUrl}
                    alt="Selected"
                    className="max-w-full max-h-96 rounded-lg shadow-lg"
                    crossOrigin="anonymous"
                  />
                </div>

                {/* Classify Button */}
                <div className="flex justify-center">
                  <button
                    onClick={classifyImage}
                    disabled={isLoading || modelLoading}
                    className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all ${
                      isLoading || modelLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#8b6f47] hover:bg-[#6d5638] text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      'Classify Image'
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Drink Analysis Result */}
            {drinkAnalysis && (
              <div className="mt-8">
                <div className={`rounded-2xl p-8 text-center shadow-2xl ${
                  drinkAnalysis.type === 'hot' 
                    ? 'bg-linear-to-br from-orange-500 to-red-600' 
                    : drinkAnalysis.type === 'cold'
                    ? 'bg-linear-to-br from-blue-500 to-cyan-600'
                    : 'bg-linear-to-br from-gray-500 to-gray-700'
                }`}>
                  <div className="text-8xl mb-4">
                    {drinkAnalysis.type === 'hot' ? '☕' : drinkAnalysis.type === 'cold' ? '🧊' : '❓'}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2">
                    {drinkAnalysis.type === 'hot' 
                      ? 'HOT DRINK' 
                      : drinkAnalysis.type === 'cold'
                      ? 'COLD DRINK'
                      : 'NOT A DRINK'}
                  </h3>
                  <p className="text-xl text-white/90 mb-4">
                    Detected: {drinkAnalysis.detectedItem}
                  </p>
                  <div className="bg-white/20 rounded-lg py-2 px-4 inline-block">
                    <span className="text-white font-semibold">
                      Confidence: {(drinkAnalysis.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Recommendations from Menu */}
                {recommendations.length > 0 && (
                  <div className="mt-8 bg-linear-to-br from-[#f5f3ee] to-[#e8dcc8] rounded-2xl p-6">
                    <a href="/menu" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity group">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#8b6f47] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      <h4 className="text-2xl font-bold text-[#8b6f47] group-hover:text-[#6d5638] transition-colors">Recommended from Our Menu →</h4>
                    </a>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recommendations.map((product) => (
                        <a
                          key={product.id}
                          href={`/menu/${product.id}`}
                          className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border-2 border-[#8b6f47]/20 hover:border-[#8b6f47]/50 block"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold text-[#1a0f0a] text-lg">{product.name}</h5>
                            <span className="text-[#8b6f47] font-bold text-lg">{product.price} DH</span>
                          </div>
                          {product.description && (
                            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="bg-[#8b6f47]/10 text-[#8b6f47] text-xs font-semibold px-3 py-1 rounded-full">
                              {product.category.name}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <a 
                        href="/menu"
                        className="inline-block bg-[#8b6f47] hover:bg-[#6d5638] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                      >
                        View Full Menu →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Predictions */}
            {predictions.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-[#1a0f0a] mb-6">
                  Detailed Recognition Results
                </h3>
                <div className="space-y-4">
                  {predictions.map((prediction, index) => (
                    <div
                      key={index}
                      className="bg-linear-to-r from-[#8b6f47] to-[#6d5638] rounded-lg p-4 text-white"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">
                          {prediction.className}
                        </span>
                        <span className="text-2xl font-bold">
                          {(prediction.probability * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-3">
                        <div
                          className="bg-white h-3 rounded-full transition-all duration-500"
                          style={{ width: `${prediction.probability * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Section */}
            {!imageUrl && !modelLoading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-xl font-semibold text-[#1a0f0a] mb-2">
                  No Image Selected
                </h3>
                <p className="text-gray-600">
                  Upload an image to start the recognition process
                </p>
              </div>
            )}
          </div>

          
        </div>
      </section>

      <Footer />
    </div>
  );
}
