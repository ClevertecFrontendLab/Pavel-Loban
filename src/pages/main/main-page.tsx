import React from 'react';

import {ReactComponent as  Preloader} from '../../assets/image/preloader.svg';
import { Card } from '../../components/card';
import { Footer } from '../../components/footer';
import {Header} from '../../components/header';
import { Message } from '../../components/message-after-loading/message';
import { Search } from '../../components/search/search';
import { Sections } from '../../components/sections';
import {data} from '../../data'
import { useAppDispatch,useAppSelector } from '../../hooks/redux-hooks';
import { RootState } from '../../store';
import {setIsLoading, setCloseError } from '../../store/card-slice';

import styles from './main-page.module.scss';



interface Book {
    image: string,
    id: number,
    title:string,
    author:string,
    year: number,
    free:boolean,
    returnDate:string,
    grade: number,
}

export const MainPage:React.FC = () => {

    const { view, isLoading, closeError } = useAppSelector((state: RootState) => state.card);
    const { menuIsOpen} = useAppSelector((state: RootState) => state.burger);



React.useEffect(() => {
    if(isLoading){
        document.body.classList.add('preloader_true');
    }else{
        document.body.classList.remove('preloader_true');
    }
},[isLoading])



return(

    <React.Fragment>
    {isLoading ? <div className={styles.wrapper_preloader} > <Preloader className={styles.preloader} width={68.7} height={68.7} /></div>  : null}
    <section className={styles.main_page}>

        {closeError ? <Message/> : ''}
        <Header />
        <section className={styles.content}>
            <div
            onClick={e => e.stopPropagation() } role='presentation'
            className={ menuIsOpen ? styles.burger_menu_active :styles.burger_menu}>
            <Sections dataId1='burger-showcase' dataId2='burger-books' isDesktop={false}/>
            </div>

            <div className={styles.menu}>
            <Sections dataId1='navigation-showcase' dataId2='navigation-books' isDesktop={true}/>
            </div>

        <div className={styles.container}>
        <Search/>
        <section className={view ?  styles.wrapper : styles.wrapper_list}>
            {data.map((book) => (
                <Card  key={book.id} id={book.id} image={book.image} title={book.title} author={book.author} year={book.year} free={book.free} returnDate={book.returnDate} grade={book.grade} book={book}/>
            ))}
        </section>
        </div>

        </section>

        <Footer/>
    </section>
    </React.Fragment>

)};
