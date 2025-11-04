import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface Listing {
  id: number;
  title: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  location: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  host: string;
  bookedDates: Date[];
  lat: number;
  lng: number;
}

const mockListings: Listing[] = [
  {
    id: 1,
    title: 'Современная квартира в центре',
    type: 'Квартира',
    price: 4500,
    rating: 4.9,
    reviews: 127,
    image: 'https://cdn.poehali.dev/projects/9bff079b-1598-4ab9-9e9e-b24a0e996bfc/files/bdfaa3a9-6a47-4924-b5a8-7d031c1e366e.jpg',
    location: 'Центральный район',
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Кухня', 'Стиральная машина', 'Кондиционер'],
    description: 'Просторная квартира с высокими потолками в историческом центре Санкт-Петербурга. Рядом Невский проспект и основные достопримечательности.',
    host: 'Анна',
    bookedDates: [new Date(2025, 10, 15), new Date(2025, 10, 16), new Date(2025, 10, 20)],
    lat: 59.9343,
    lng: 30.3351
  },
  {
    id: 2,
    title: 'Уютная студия у метро',
    type: 'Студия',
    price: 2800,
    rating: 4.8,
    reviews: 89,
    image: 'https://cdn.poehali.dev/projects/9bff079b-1598-4ab9-9e9e-b24a0e996bfc/files/e425312d-dfc6-4781-a5fb-07c0b613985f.jpg',
    location: 'Петроградский район',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Кухня', 'Телевизор'],
    description: 'Компактная и светлая студия в тихом районе. Идеально для пары или одного гостя.',
    host: 'Дмитрий',
    bookedDates: [new Date(2025, 10, 10), new Date(2025, 10, 11)],
    lat: 59.9665,
    lng: 30.3113
  },
  {
    id: 3,
    title: 'Люкс отель с видом на город',
    type: 'Отель',
    price: 6900,
    rating: 5.0,
    reviews: 234,
    image: 'https://cdn.poehali.dev/projects/9bff079b-1598-4ab9-9e9e-b24a0e996bfc/files/83f9eb74-0b78-40ad-ba04-aaad80afbd81.jpg',
    location: 'Адмиралтейский район',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Завтрак', 'Парковка', 'Спортзал', 'Консьерж'],
    description: 'Премиальный номер с панорамным видом на Неву. Сервис мирового уровня.',
    host: 'Отель Аврора',
    bookedDates: [],
    lat: 59.9311,
    lng: 30.3609
  },
  {
    id: 4,
    title: 'Индустриальный лофт с видом',
    type: 'Квартира',
    price: 5200,
    rating: 4.7,
    reviews: 64,
    image: 'https://cdn.poehali.dev/projects/9bff079b-1598-4ab9-9e9e-b24a0e996bfc/files/21029753-9150-4437-a043-e42fbc055ab8.jpg',
    location: 'Василеостровский район',
    guests: 6,
    bedrooms: 2,
    beds: 3,
    bathrooms: 2,
    amenities: ['Wi-Fi', 'Кухня', 'Рабочее место', 'Стиральная машина', 'Посудомоечная машина'],
    description: 'Стильный лофт с кирпичными стенами и панорамными окнами. Идеально для творческих людей и семей.',
    host: 'Максим',
    bookedDates: [new Date(2025, 10, 8), new Date(2025, 10, 9)],
    lat: 59.9406,
    lng: 30.2887
  },
  {
    id: 5,
    title: 'Пентхаус с террасой',
    type: 'Квартира',
    price: 8500,
    rating: 5.0,
    reviews: 156,
    image: 'https://cdn.poehali.dev/projects/9bff079b-1598-4ab9-9e9e-b24a0e996bfc/files/adbf7dc7-3c43-4b0a-a64e-0ef20d2dea61.jpg',
    location: 'Центральный район',
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    amenities: ['Wi-Fi', 'Кухня', 'Терраса', 'Панорамные окна', 'Кондиционер', 'Умный дом'],
    description: 'Роскошный пентхаус с террасой и видом на Неву. Премиальная отделка, современная техника.',
    host: 'Елена',
    bookedDates: [],
    lat: 59.9386,
    lng: 30.3141
  },
  {
    id: 6,
    title: 'Бюджетный хостел в центре',
    type: 'Хостел',
    price: 800,
    rating: 4.3,
    reviews: 312,
    image: 'https://cdn.poehali.dev/projects/9bff079b-1598-4ab9-9e9e-b24a0e996bfc/files/639c69dd-89d3-4cfb-827b-d1d9a8a53197.jpg',
    location: 'Центральный район',
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Общая кухня', 'Прачечная', 'Камера хранения'],
    description: 'Чистый и уютный хостел для бюджетных путешественников. Дружелюбная атмосфера, рядом метро.',
    host: 'Хостел Питер',
    bookedDates: [new Date(2025, 10, 12), new Date(2025, 10, 13), new Date(2025, 10, 14)],
    lat: 59.9296,
    lng: 30.3194
  },
  {
    id: 7,
    title: 'Семейная квартира у Эрмитажа',
    type: 'Квартира',
    price: 5800,
    rating: 4.9,
    reviews: 98,
    image: 'https://cdn.poehali.dev/projects/9bff079b-1598-4ab9-9e9e-b24a0e996bfc/files/bdfaa3a9-6a47-4924-b5a8-7d031c1e366e.jpg',
    location: 'Адмиралтейский район',
    guests: 5,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    amenities: ['Wi-Fi', 'Кухня', 'Детская кроватка', 'Стиральная машина', 'Посудомоечная машина'],
    description: 'Просторная квартира идеально подходит для семей с детьми. 5 минут пешком до Эрмитажа.',
    host: 'Ольга',
    bookedDates: [],
    lat: 59.9398,
    lng: 30.3146
  },
  {
    id: 8,
    title: 'Романтическая студия на Мойке',
    type: 'Студия',
    price: 3200,
    rating: 4.6,
    reviews: 73,
    image: 'https://cdn.poehali.dev/projects/9bff079b-1598-4ab9-9e9e-b24a0e996bfc/files/e425312d-dfc6-4781-a5fb-07c0b613985f.jpg',
    location: 'Центральный район',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Кухня', 'Вид на канал', 'Камин'],
    description: 'Уютная студия с видом на канал Мойка. Идеальное место для романтического отдыха.',
    host: 'Михаил',
    bookedDates: [new Date(2025, 10, 18), new Date(2025, 10, 19)],
    lat: 59.9342,
    lng: 30.3267
  },
  {
    id: 9,
    title: 'Отель у Московского вокзала',
    type: 'Отель',
    price: 4200,
    rating: 4.5,
    reviews: 189,
    image: 'https://cdn.poehali.dev/projects/9bff079b-1598-4ab9-9e9e-b24a0e996bfc/files/83f9eb74-0b78-40ad-ba04-aaad80afbd81.jpg',
    location: 'Центральный район',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: ['Wi-Fi', 'Завтрак', 'Трансфер', 'Консьерж', 'Сейф'],
    description: 'Удобный отель рядом с вокзалом. Идеально для транзитных гостей города.',
    host: 'Отель Москва',
    bookedDates: [],
    lat: 59.9299,
    lng: 30.3606
  }
];

export default function Index() {
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [bookingCheckIn, setBookingCheckIn] = useState<Date>();
  const [bookingCheckOut, setBookingCheckOut] = useState<Date>();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [propertyType, setPropertyType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [hoveredListing, setHoveredListing] = useState<number | null>(null);

  const filteredListings = mockListings.filter(listing => {
    if (searchLocation && !listing.location.toLowerCase().includes(searchLocation.toLowerCase())) {
      return false;
    }
    if (guests > listing.guests) {
      return false;
    }
    if (listing.price < priceRange[0] || listing.price > priceRange[1]) {
      return false;
    }
    if (propertyType !== 'all' && listing.type !== propertyType) {
      return false;
    }
    return true;
  });

  const isDateBooked = (date: Date, listing: Listing) => {
    return listing.bookedDates.some(bookedDate => 
      bookedDate.toDateString() === date.toDateString()
    );
  };

  const calculateTotalPrice = (listing: Listing) => {
    if (!bookingCheckIn || !bookingCheckOut) return 0;
    const nights = Math.ceil((bookingCheckOut.getTime() - bookingCheckIn.getTime()) / (1000 * 60 * 60 * 24));
    return listing.price * nights;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary font-heading">PiterStay</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">Сдать жилье</Button>
              <Button variant="ghost" size="icon">
                <Icon name="Globe" size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 animate-fade-in">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Куда</label>
                  <Input
                    placeholder="Санкт-Петербург"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Заезд</label>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        {checkIn ? format(checkIn, 'dd MMM', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} locale={ru} />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Выезд</label>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        {checkOut ? format(checkOut, 'dd MMM', { locale: ru }) : 'Выберите дату'}
                      </Button>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} locale={ru} />
                  </PopoverContent>
                </Popover>

                <div>
                  <label className="text-sm font-medium mb-2 block">Гости</label>
                  <Input
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
              
              <Button className="w-full md:w-auto mt-4 bg-primary hover:bg-primary/90">
                <Icon name="Search" size={16} className="mr-2" />
                Найти жилье
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-heading">Объявления в Санкт-Петербурге</h2>
            <div className="flex gap-2">
              <Button 
                variant={showMap ? "default" : "outline"}
                onClick={() => setShowMap(!showMap)}
                className="flex items-center gap-2"
              >
                <Icon name="Map" size={18} />
                Карта
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Icon name="SlidersHorizontal" size={18} />
                Фильтры
              </Button>
            </div>
          </div>

          {showFilters && (
            <Card className="mb-6 animate-fade-in">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Тип жилья</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Все типы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        <SelectItem value="Квартира">Квартира</SelectItem>
                        <SelectItem value="Студия">Студия</SelectItem>
                        <SelectItem value="Отель">Отель</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Цена за ночь: ₽{priceRange[0].toLocaleString()} - ₽{priceRange[1].toLocaleString()}
                    </label>
                    <Slider
                      min={0}
                      max={10000}
                      step={500}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setPriceRange([0, 10000]);
                      setPropertyType('all');
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Найдено объявлений: {filteredListings.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {showMap ? (
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
              <div className="h-[600px] overflow-y-auto space-y-4">
                {filteredListings.map((listing) => (
                  <Dialog key={listing.id} onOpenChange={(open) => !open && setSelectedListing(null)}>
                    <DialogTrigger asChild>
                      <Card 
                        className={`cursor-pointer transition-all duration-300 ${
                          hoveredListing === listing.id ? 'ring-2 ring-primary shadow-xl scale-[1.02]' : 'hover:shadow-lg'
                        }`}
                        onClick={() => setSelectedListing(listing)}
                        onMouseEnter={() => setHoveredListing(listing.id)}
                        onMouseLeave={() => setHoveredListing(null)}
                      >
                        <div className="flex gap-4 p-4">
                          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                              src={listing.image}
                              alt={listing.title}
                              className="w-full h-full object-cover"
                            />
                            <Badge className="absolute top-2 right-2 bg-white/90 text-foreground text-xs">
                              {listing.type}
                            </Badge>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-semibold font-heading line-clamp-1">{listing.title}</h3>
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{listing.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{listing.location}</p>
                            <div className="flex items-baseline gap-1">
                              <span className="text-lg font-bold">₽{listing.price.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground">/ ночь</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      {selectedListing && selectedListing.id === listing.id && (
                        <>
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-heading">{selectedListing.title}</DialogTitle>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{selectedListing.rating}</span>
                                <span className="text-muted-foreground">({selectedListing.reviews} отзывов)</span>
                              </div>
                              <span className="text-muted-foreground">{selectedListing.location}</span>
                            </div>
                          </DialogHeader>
                          
                          <div className="space-y-6 mt-4">
                            <img
                              src={selectedListing.image}
                              alt={selectedListing.title}
                              className="w-full h-96 object-cover rounded-lg"
                            />
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-semibold text-lg mb-3 font-heading">О жилье</h3>
                                <p className="text-muted-foreground mb-4">{selectedListing.description}</p>
                                
                                <div className="flex items-center gap-6 mb-4">
                                  <div className="flex items-center gap-2">
                                    <Icon name="Users" size={20} />
                                    <span>{selectedListing.guests} гостей</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon name="Bed" size={20} />
                                    <span>{selectedListing.bedrooms} спален</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon name="Bath" size={20} />
                                    <span>{selectedListing.bathrooms} ванных</span>
                                  </div>
                                </div>
                                
                                <div className="mb-4">
                                  <h4 className="font-semibold mb-2">Удобства</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedListing.amenities.map((amenity) => (
                                      <Badge key={amenity} variant="secondary">{amenity}</Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Icon name="User" size={24} />
                                  </div>
                                  <div>
                                    <p className="font-medium">Хозяин: {selectedListing.host}</p>
                                    <p className="text-sm text-muted-foreground">На платформе с 2023</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <Card className="sticky top-4 shadow-lg">
                                  <CardContent className="p-6">
                                    <div className="text-center mb-4">
                                      <span className="text-3xl font-bold">₽{selectedListing.price.toLocaleString()}</span>
                                      <span className="text-muted-foreground ml-2">/ ночь</span>
                                    </div>
                                    
                                    <div className="space-y-4 mb-4">
                                      <div>
                                        <label className="text-sm font-medium mb-2 block">Заезд</label>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start">
                                              <Icon name="Calendar" size={16} className="mr-2" />
                                              {bookingCheckIn ? format(bookingCheckIn, 'dd MMM yyyy', { locale: ru }) : 'Выберите дату'}
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-auto p-0">
                                            <Calendar 
                                              mode="single" 
                                              selected={bookingCheckIn} 
                                              onSelect={setBookingCheckIn}
                                              locale={ru}
                                              disabled={(date) => isDateBooked(date, selectedListing)}
                                            />
                                          </PopoverContent>
                                        </Popover>
                                      </div>
                                      
                                      <div>
                                        <label className="text-sm font-medium mb-2 block">Выезд</label>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start">
                                              <Icon name="Calendar" size={16} className="mr-2" />
                                              {bookingCheckOut ? format(bookingCheckOut, 'dd MMM yyyy', { locale: ru }) : 'Выберите дату'}
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-auto p-0">
                                            <Calendar 
                                              mode="single" 
                                              selected={bookingCheckOut} 
                                              onSelect={setBookingCheckOut}
                                              locale={ru}
                                              disabled={(date) => isDateBooked(date, selectedListing) || (bookingCheckIn ? date <= bookingCheckIn : false)}
                                            />
                                          </PopoverContent>
                                        </Popover>
                                      </div>
                                    </div>
                                    
                                    {bookingCheckIn && bookingCheckOut && (
                                      <div className="p-4 bg-secondary rounded-lg mb-4">
                                        <div className="flex justify-between mb-2">
                                          <span>Ночей:</span>
                                          <span className="font-medium">
                                            {Math.ceil((bookingCheckOut.getTime() - bookingCheckIn.getTime()) / (1000 * 60 * 60 * 24))}
                                          </span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold">
                                          <span>Итого:</span>
                                          <span>₽{calculateTotalPrice(selectedListing).toLocaleString()}</span>
                                        </div>
                                      </div>
                                    )}
                                    
                                    <Button 
                                      className="w-full bg-primary hover:bg-primary/90" 
                                      size="lg"
                                      disabled={!bookingCheckIn || !bookingCheckOut}
                                    >
                                      Забронировать
                                    </Button>
                                    
                                    <p className="text-xs text-center text-muted-foreground mt-3">
                                      Оплата производится после подтверждения бронирования
                                    </p>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                ))}
              </div>

              <div className="sticky top-4 h-[600px] bg-secondary rounded-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=59.9343,30.3351&zoom=12`}
                  />
                  <div className="absolute top-4 left-4 right-4 pointer-events-none">
                    <Card className="pointer-events-auto">
                      <CardContent className="p-3">
                        <p className="text-sm font-medium">📍 Найдено объектов: {filteredListings.length}</p>
                        <p className="text-xs text-muted-foreground mt-1">Наведите на объявление для подсветки</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <Dialog key={listing.id} onOpenChange={(open) => !open && setSelectedListing(null)}>
                  <DialogTrigger asChild>
                    <Card 
                      className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-scale-in overflow-hidden"
                      onClick={() => setSelectedListing(listing)}
                    >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-foreground">
                        {listing.type}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg font-heading line-clamp-1">{listing.title}</h3>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{listing.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{listing.location}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span>{listing.guests} гостей</span>
                        <span>•</span>
                        <span>{listing.bedrooms} спален</span>
                        <span>•</span>
                        <span>{listing.beds} кроватей</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold">₽{listing.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">/ ночь</span>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  {selectedListing && (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-heading">{selectedListing.title}</DialogTitle>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{selectedListing.rating}</span>
                            <span className="text-muted-foreground">({selectedListing.reviews} отзывов)</span>
                          </div>
                          <span className="text-muted-foreground">{selectedListing.location}</span>
                        </div>
                      </DialogHeader>
                      
                      <div className="space-y-6 mt-4">
                        <img
                          src={selectedListing.image}
                          alt={selectedListing.title}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold text-lg mb-3 font-heading">О жилье</h3>
                            <p className="text-muted-foreground mb-4">{selectedListing.description}</p>
                            
                            <div className="flex items-center gap-6 mb-4">
                              <div className="flex items-center gap-2">
                                <Icon name="Users" size={20} />
                                <span>{selectedListing.guests} гостей</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Icon name="Bed" size={20} />
                                <span>{selectedListing.bedrooms} спален</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Icon name="Bath" size={20} />
                                <span>{selectedListing.bathrooms} ванных</span>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h4 className="font-semibold mb-2">Удобства</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedListing.amenities.map((amenity) => (
                                  <Badge key={amenity} variant="secondary">{amenity}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <Icon name="User" size={24} />
                              </div>
                              <div>
                                <p className="font-medium">Хозяин: {selectedListing.host}</p>
                                <p className="text-sm text-muted-foreground">На платформе с 2023</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Card className="sticky top-4 shadow-lg">
                              <CardContent className="p-6">
                                <div className="text-center mb-4">
                                  <span className="text-3xl font-bold">₽{selectedListing.price.toLocaleString()}</span>
                                  <span className="text-muted-foreground ml-2">/ ночь</span>
                                </div>
                                
                                <div className="space-y-4 mb-4">
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Заезд</label>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start">
                                          <Icon name="Calendar" size={16} className="mr-2" />
                                          {bookingCheckIn ? format(bookingCheckIn, 'dd MMM yyyy', { locale: ru }) : 'Выберите дату'}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <Calendar 
                                          mode="single" 
                                          selected={bookingCheckIn} 
                                          onSelect={setBookingCheckIn}
                                          locale={ru}
                                          disabled={(date) => isDateBooked(date, selectedListing)}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                  
                                  <div>
                                    <label className="text-sm font-medium mb-2 block">Выезд</label>
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-full justify-start">
                                          <Icon name="Calendar" size={16} className="mr-2" />
                                          {bookingCheckOut ? format(bookingCheckOut, 'dd MMM yyyy', { locale: ru }) : 'Выберите дату'}
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-auto p-0">
                                        <Calendar 
                                          mode="single" 
                                          selected={bookingCheckOut} 
                                          onSelect={setBookingCheckOut}
                                          locale={ru}
                                          disabled={(date) => isDateBooked(date, selectedListing) || (bookingCheckIn ? date <= bookingCheckIn : false)}
                                        />
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                                
                                {bookingCheckIn && bookingCheckOut && (
                                  <div className="p-4 bg-secondary rounded-lg mb-4">
                                    <div className="flex justify-between mb-2">
                                      <span>Ночей:</span>
                                      <span className="font-medium">
                                        {Math.ceil((bookingCheckOut.getTime() - bookingCheckIn.getTime()) / (1000 * 60 * 60 * 24))}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                      <span>Итого:</span>
                                      <span>₽{calculateTotalPrice(selectedListing).toLocaleString()}</span>
                                    </div>
                                  </div>
                                )}
                                
                                <Button 
                                  className="w-full bg-primary hover:bg-primary/90" 
                                  size="lg"
                                  disabled={!bookingCheckIn || !bookingCheckOut}
                                >
                                  Забронировать
                                </Button>
                                
                                <p className="text-xs text-center text-muted-foreground mt-3">
                                  Оплата производится после подтверждения бронирования
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}