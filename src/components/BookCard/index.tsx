import React, {useCallback, useState } from "react";
import { Container, FaHeartIcon } from "./style";

interface BookCardProps {
  book: {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publishedDate: string;
      description: string;
      publisher: string;
      imageLinks: {
        thumbnail: string;
      };
    };
    saleInfo: {
      saleability: string;
      buyLink: string;
    };
  };
}

const BookCard: React.FC<BookCardProps> = (Props) => {

  const { id, volumeInfo, saleInfo } = Props.book;

  const [isFave,setIsfav] = useState<boolean>(() => {

  const localStorageItem:any = localStorage.getItem('@BookFinderWeb');
  const parseLocalStorage = JSON.parse(localStorageItem);
  
    return parseLocalStorage !== null 
    ? (parseLocalStorage.some((item:any) => item.id === id))
    : false;

  });

  const  handleStorageValues = useCallback(() => {

    let localStorageItem:any = localStorage.getItem('@BookFinderWeb');

    const wishList = localStorageItem !== null 
    ? (JSON.parse(localStorageItem))
    : [{}];


    if(isFave){
      setIsfav(!isFave);
      const newWishList = wishList.filter((value: any) => value.id !== id);
      localStorage.setItem('@BookFinderWeb', JSON.stringify(newWishList));

    }else{
      setIsfav(!isFave);
      localStorage.setItem('@BookFinderWeb',JSON.stringify([...wishList,Props.book]));
    }
    
  },[Props.book,id, isFave] );

  return (
    <Container>
      <strong>{volumeInfo.title}</strong>
      <span>{volumeInfo.publishedDate}</span>
      <span>{volumeInfo.publisher}</span>

      {volumeInfo.authors !== undefined &&
        volumeInfo.authors.map((author) => {
          return <p key={`${author}_${id}`}>{author}</p>;
        })}
      {volumeInfo.imageLinks !== undefined && (
        <img src={volumeInfo.imageLinks.thumbnail} alt={volumeInfo.title} />
      )}
      <div className="description">
        <p>{volumeInfo.description !== undefined && volumeInfo.description}</p>
      </div>
        <button onClick={() => handleStorageValues()}>
          <FaHeartIcon color={isFave ? "tomato":"gray"} /> <span>wishlist</span>
        </button>
          
      <a
        target="blank"
        rel="noopener"
        href={
          saleInfo.saleability === "FOR_SALE"
            ? saleInfo.buyLink
            : `https://www.google.com.br/s?k=${volumeInfo.title}`
        }
        style={
          saleInfo.saleability === "FOR_SALE"
            ? undefined
            : { background: "#E67A00" }
        }
      >
        Download Now
      </a>

    </Container>
  );
};

export default BookCard;
