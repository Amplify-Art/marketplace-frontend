import React, { useState } from 'react';


export default function ({
    src,
    fallbackImage,
    ...rest
}) {
    console.log(src)
    const [error, setError] = useState(false)
    const onImageLoadError = () => {
        setError(true)
    }
    return (
        <img src={error ? fallbackImage : src} onError={onImageLoadError} {...rest} />
    )
}