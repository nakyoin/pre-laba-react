import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import '../App.css'



export default function Alb() {
    const [albums, setAlbums] = React.useState([]);
    const [photos, setPhotos] = React.useState([]);
    const [albumId, setAlbumId] = React.useState(0);
    const [isAlbums, setIsAlbums] = React.useState(true);
    const [favorites, setFavorites] = React.useState([]);

    const handleFavorites = (photo) => {
        const newFavorites = [...favorites];
        const index = newFavorites.findIndex(item => item.id === photo.id);
        if (index === -1) {
            newFavorites.push(photo);
        } else {
            newFavorites.splice(index, 1);
        }
        setFavorites(newFavorites);
    }

    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(response => response.json())
            .then(json => setAlbums(json))
    }
        , [])

    React.useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
            .then(response => response.json())
            .then(json => setPhotos(json))
    }

        , [albumId])

    return (
        <div className="albums">
            <div className="albums__list">
                {albums.map(album => (
                    <div className="albums__item" key={album.id}>
                        <button onClick={() => {
                            setAlbumId(album.id);
                            setIsAlbums(false);
                        }
                        }>{album.title}</button>
                    </div>
                ))}
            </div>
            <div className="albums__photos">
                {isAlbums ? (
                    <div className="albums__photos__favorites">
                        <h1>Избранное</h1>
                        {favorites.map(photo => (
                            <div className="albums__photos__item" key={photo.id}>
                                <img src={photo.thumbnailUrl} alt={photo.title} />
                                <p>{photo.title}</p>
                                <button onClick={() => handleFavorites(photo)}>Удалить из избранного</button>
                            </div>
                        ))}
                    </div>
                ) : (

                    <div className="albums__photos__list">
                        {photos.map(photo => (
                            <div className="albums__photos__item" key={photo.id}>
                                <img src={photo.thumbnailUrl} alt={photo.title} />
                                <p>{photo.title}</p>
                                <button className="shrink-border" onClick={() => handleFavorites(photo)} >Добавить в избранное</button>
                            </div>
                        ))}
                        <h1>Избранное</h1>
                        {favorites.map(photo => (
                            <div className="albums__photos__item" key={photo.id}>
                                <img src={photo.thumbnailUrl} alt={photo.title} />
                                <p>{photo.title}</p>
                                <button className="shrink-border" onClick={() => handleFavorites(photo)}>Удалить из избранного</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}