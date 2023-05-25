import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Loader from './Loader/Loader';
import Button from './Button';
import { AppWrap } from './App.styled';

export const App = () => {
  const [imagesArray, setImagesArray] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [page, setPage] = useState(1);
  const [showBtnLoadMore, setShowBtnLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitSearchBtn = toFind => {
    if (toFind === query) {
      toast(`ви повторно намагаєтесь знайти картинки про: "${toFind}"!`);
      return;
    }
    setImagesArray([]);
    setPage(1);
    setQuery(toFind);
    getFromAPI(toFind, 1);
  };

  const loadMorePictures = () => {
    getFromAPI(query, page + 1);
    setPage(prevPage => prevPage + 1);
  };

  async function getFromAPI(toFind, page) {
    // параметри для запиту
    const API_KEY = '34781743-09d11a08c8aa729d147b2c9f6';
    const BASE_URL = 'https://pixabay.com/api/';

    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    });

    const URL = `${BASE_URL}?key=${API_KEY}&q=${toFind}&page=${page}&${searchParams}`;
    setIsLoading(true);
    const response = await axios.get(URL);
    if (response.data.totalHits < 1) {
      toast(`За запитом "${toFind}" результатів нема!`);
      setPage(1);
      setQuery('');
      setShowBtnLoadMore(false);
    } else if (response.data.hits.length !== 0) {
      setImagesArray(prevImagesArray => [
        ...prevImagesArray,
        ...response.data.hits,
      ]);

      const alreadyDownloaded = 12 * page;
      if (alreadyDownloaded < response.data.totalHits) {
        if (page === 1) {
          toast(
            `За запитом "${toFind}" знайдено картинок: ${response.data.totalHits}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
          );
        } else {
          const moreImages = response.data.totalHits - alreadyDownloaded;
          toast(
            `За запитом "${toFind}" лишилося ще картинок: ${moreImages} із ${response.data.totalHits}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
          );
        }

        setShowBtnLoadMore(true);
      } else {
        toast(
          `Це всі результати за запитом "${toFind}". Більше результатів нема!`
        );
        setShowBtnLoadMore(false);
      }
    }

    setIsLoading(false);
  }

  return (
    <AppWrap>
      {isLoading && <Loader />}
      <ToastContainer autoClose={3000} />
      <Searchbar onSubmit={onSubmitSearchBtn} />
      {query && (
        <ImageGallery
          imagesArray={imagesArray}
          setShowModal={setShowModal}
          setImageLink={setImageLink}
        />
      )}
      {showBtnLoadMore && <Button loadMorePictures={loadMorePictures} />}
      {showModal && <Modal imageLink={imageLink} setShowModal={setShowModal} />}
    </AppWrap>
  );
};
