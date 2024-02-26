import {api} from "../utilities.jsx";
export const AddNewMovie = async (watchlistId, movie) => {
  const data = {
    name: movie["title"],
    release_date: movie["release_date"],
    summary: movie["overview"],
  };

  if (movie["poster_path"]) {
    data["img_src"] = `https://image.tmdb.org/t/p/w500${movie["poster_path"]}`;
  } else {
    data["img_src"] = posterNotAvailable;
  }
  const response = await api.put(`watchlist/${watchlistId}/movie`, {
    data: data,
  });

  return response;
};

export const CreateNewWatchlist = async (watchlistName, user, isPublic) => {
  const data = {
    name: watchlistName,
    user: user,
    isPublic: isPublic,
  };

  const response = await api.post("watchlist/", data);
  return response;
};
