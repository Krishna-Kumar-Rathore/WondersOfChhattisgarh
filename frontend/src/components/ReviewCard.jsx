function ReviewCard({ review }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
          <div className="flex items-center mt-1">
            <div className="flex">
              {renderStars(review.rating)}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
}

export default ReviewCard;