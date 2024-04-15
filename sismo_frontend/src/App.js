import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FeatureList = () => {
  const [features, setFeatures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [magTypeFilter, setMagTypeFilter] = useState('');
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const params = {
          page: currentPage,
          per_page: perPage,
        };

        if (magTypeFilter) {
          params.filters = {
            mag_type: magTypeFilter
          };
        }

        const response = await axios.get(`http://127.0.0.1:3000/api/features`, {
          params: params
        });
        setFeatures(response.data.data);
        setTotalPages(response.data.pagination.total_pages);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, [currentPage, perPage, magTypeFilter]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleMagTypeFilterChange = (event) => {
    setMagTypeFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleCommentSubmit = async (featureId, comment) => {
    try {
      const response = await axios.post(`http://127.0.0.1:3000/api/features/${featureId}/comments`, {
        comment: { body: comment }
      });
      // Actualizar los comentarios solo si se agregó con éxito
      if (response.status === 201) {
        setComments(prevComments => ({
          ...prevComments,
          [featureId]: [...(prevComments[featureId] || []), response.data]
        }));
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const fetchComments = async (featureId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/features/${featureId}/comments`);
      setComments(prevComments => ({
        ...prevComments,
        [featureId]: response.data
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    // Cargar comentarios para cada característica
    features.forEach(feature => {
      fetchComments(feature.id);
    });
  }, [features]);

  return (
    <div>
      <h1>Lista de Eventos Sísmicos</h1>
      <div>
        <label htmlFor="perPage">Features por página:</label>
        <select id="perPage" value={perPage} onChange={handlePerPageChange}>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
      <div>
        <label htmlFor="magTypeFilter">Filtrar por mag_type:</label>
        <select id="magTypeFilter" value={magTypeFilter} onChange={handleMagTypeFilterChange}>
          <option value="">Todos</option>
          <option value="md">md</option>
          <option value="ml">ml</option>
          <option value="ms">ms</option>
          <option value="mw">mw</option>
          <option value="me">me</option>
          <option value="mi">mi</option>
          <option value="mb">mb</option>
          <option value="mlg">mlg</option>
        </select>
      </div>
      <ul>
        {features.map(feature => (
          <li key={feature.id}>
            <p>Titulo: {feature.title}</p>
            <p>Fecha: {feature.time}</p>
            <p>Magnitud: {feature.magnitude}</p>
            <p>Tipo: {feature.mag_type}</p>
            <p>Lugar: {feature.place}</p>
            <p>Latitud: {feature.latitude}</p>
            <p>Longitud: {feature.longitude}</p>
            <p>Tsunami: {feature.tsunami ? 'sí' : 'no'}</p>
            {/* Agregar campo para comentarios */}
            <div>
              <input type="text" placeholder="Agregar comentario..." onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCommentSubmit(feature.id, e.target.value);
                  e.target.value = '';
                }
              }} />
            </div>
            <ul>
              {comments[feature.id] && comments[feature.id].map(comment => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
      </div>
      <div>
        <h2>Tipos de Magnitudes</h2>
        <ul>
          <li><strong>Md: Magnitud de duración</strong>. Es una medida de la duración total de las ondas sísmicas.</li>
          <li><strong>Ml: Magnitud de onda local</strong>. Es una medida de la amplitud máxima de las ondas sísmicas registradas en una estación de monitoreo.</li>
          <li><strong>Ms: Magnitud superficial</strong>. Es una medida de la amplitud de las ondas sísmicas registradas en la superficie de la Tierra.</li>
          <li><strong>Mw: Magnitud de momento</strong>. Es una medida de la cantidad total de energía liberada por un terremoto, calculada a partir de la cantidad de desplazamiento a lo largo de la falla y la rigidez de las rocas.</li>
          <li><strong>Me: Magnitud de energía</strong>. Es una medida de la cantidad de energía liberada por un terremoto.</li>
          <li><strong>Mi: Magnitud de intensidad</strong>. Es una medida de los efectos del terremoto en la superficie de la Tierra y en las estructuras humanas.</li>
          <li><strong>Mb: Magnitud de onda corporal</strong>. Es una medida de la amplitud de las ondas sísmicas registradas en el interior de la Tierra.</li>
          <li><strong>Mlg: Magnitud de onda local (variante)</strong>. Similar a Ml, pero ajustada para distancias más grandes.</li>
        </ul>
      </div>
    </div>
  );
};

export default FeatureList;
