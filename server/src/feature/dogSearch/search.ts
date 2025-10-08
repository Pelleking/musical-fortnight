export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  color: string;
  size: string;
}

const mockDogs: Dog[] = [
  { id: '1', name: 'Buddy', breed: 'labrador', age: 3, color: 'yellow', size: 'large' },
  { id: '2', name: 'Max', breed: 'labrador', age: 5, color: 'black', size: 'large' },
  { id: '3', name: 'Charlie', breed: 'labrador', age: 2, color: 'chocolate', size: 'large' },
  { id: '4', name: 'Bella', breed: 'poodle', age: 4, color: 'white', size: 'medium' },
  { id: '5', name: 'Lucy', breed: 'beagle', age: 6, color: 'tricolor', size: 'small' },
  { id: '6', name: 'Daisy', breed: 'golden retriever', age: 3, color: 'golden', size: 'large' },
];

export function searchDogs(query?: string): Dog[] {
  if (!query) {
    return mockDogs;
  }
  
  const lowerQuery = query.toLowerCase();
  
  return mockDogs.filter(dog => 
    dog.name.toLowerCase().includes(lowerQuery) ||
    dog.breed.toLowerCase().includes(lowerQuery) ||
    dog.color.toLowerCase().includes(lowerQuery) ||
    dog.size.toLowerCase().includes(lowerQuery) ||
    dog.age.toString().includes(lowerQuery)
  );
}
