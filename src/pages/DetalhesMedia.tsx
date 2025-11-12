import React from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useMediaStore } from "../store/useMediaStore";

const DetalhesMedia: React.FC = () => {
  const { media_type, id } = useParams<{ media_type: string; id: string }>();

  if (!media_type || !id) {
    return <ErrorMessage message="URL inválida." />;
  }

  const buscaIdNoCache = useMediaStore((state) =>
    state.mediaList.find(
      (item) => item.id === Number(id) && item.media_type == media_type
    )
  );
};

export default DetalhesMedia;
