import './SearchResultCard.scss';

function SearchResultCard(props) {
  return (
    <div className="cardWrapper">
      <div className="imageHolder">
        <img src={
          props.data.banner
            ? props.data.banner
            : props.data.avatar
              ? props.data.avatar
              : 'https://centraverse-notification-assets.s3.us-east-2.amazonaws.com/user-photos/1611928580060/test2.jpg' // TODO: need to put default image
          } alt="cover photo" />
      </div>
      <div className="content">
        <div className="content-heading">{props.type === 'artists' ? props.data.name : props.data.title}</div>
        <div className="content-details">{
          props.type === 'albums'
            ? props.data.title
            : props.type === 'artists'
              ? `${props.songsCount} songs`
              : props.data.title
            }
          </div>
      </div>
      <div className="contentType">
        <div className="contentType-heading">{
          props.type === 'albums'
            ? 'Album'
            : props.type === 'artists'
              ? 'Artist'
              : 'Song'
            }
          </div>
        <div className="contentType-detail"></div>
      </div>
    </div>
  );
}
export default SearchResultCard;
