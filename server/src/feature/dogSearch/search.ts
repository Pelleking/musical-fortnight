import mockupData from './mockup.json';

export interface Dog {
  id: number;
  name: string;
  breed: string;
  age: number;
  color: string;
  weight: number;
  temperament: string;
}

const mockDogs: Dog[] = mockupData.dogs;

export function searchDogs(query?: string): Dog[] {
  if (!query) {
    return mockDogs;
  }
  
  const lowerQuery = query.toLowerCase();
  
  return mockDogs.filter(dog => 
    dog.name.toLowerCase().includes(lowerQuery) ||
    dog.breed.toLowerCase().includes(lowerQuery) ||
    dog.color.toLowerCase().includes(lowerQuery) ||
    dog.temperament.toLowerCase().includes(lowerQuery) ||
    dog.age.toString().includes(lowerQuery) ||
    dog.weight.toString().includes(lowerQuery)
  );
}
