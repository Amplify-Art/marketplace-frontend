import React, { useState } from 'react';


// eslint-disable-next-line import/no-anonymous-default-export
export default function ({
    src,
    fallbackImage,
    ...rest
}) {
    const [error, setError] = useState(false)
    const onImageLoadError = () => {
        setError(true)
    }
    return (
        <img src={error ? fallbackImage : src} onError={onImageLoadError} {...rest} alt="fallback" />
    )
}