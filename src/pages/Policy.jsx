const Policy = () => {
  return (
    <div className="min-h-75vh">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl text-blue-800">Políticas de privacidad</h1>
        <p className="my-4 text-xl font-medium text-gray-600">
          En esta página web, nos tomamos muy en serio la privacidad de nuestros
          usuarios. A continuación, se detallan nuestras políticas de privacidad
          con respecto a la recolección, uso y protección de los datos
          personales de nuestros usuarios.
        </p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="my-2">
            <h2 className="text-2xl text-gray-900 font-bold">
              Recolección de datos personales
            </h2>
            <p className="my-4 text-lg font-medium text-gray-600 text-justify">
              Para poder utilizar nuestra galería de imágenes, los usuarios
              deben registrarse en nuestra página web y proporcionar cierta
              información personal, como su nombre, correo electrónico y
              contraseña. Además, los usuarios pueden subir imágenes a la
              página, ya sean{" "}
              <strong className="font-bold">
                normales para todo el público
              </strong>{" "}
              o <strong className="font-bold">para adultos</strong>.
            </p>
          </div>
          <div className="my-2">
            <h2 className="text-2xl text-gray-900 font-bold">
              Uso de los datos personales
            </h2>
            <p className="my-4 text-lg font-medium text-gray-600 text-justify">
              Los datos personales que recolectamos de nuestros usuarios son
              utilizados únicamente para poder ofrecerles nuestros servicios de
              manera efectiva y para mejorar la experiencia de usuario en
              nuestra página web. Además, utilizamos la información de contacto
              para enviar notificaciones importantes sobre la cuenta del
              usuario, como cambios en las políticas de privacidad o
              actualizaciones en nuestros servicios.
            </p>
          </div>
          <div className="my-2">
            <h2 className="text-2xl text-gray-900 font-bold">
              Protección de los datos personales
            </h2>
            <p className="my-4 text-lg font-medium text-gray-600 text-justify">
              Nos comprometemos a proteger los datos personales de nuestros
              usuarios y tomamos medidas de seguridad adecuadas para garantizar
              su seguridad. Sin embargo, es importante tener en cuenta que
              ningún método de transmisión por internet o almacenamiento
              electrónico es 100% seguro. Por lo tanto, no podemos garantizar la
              seguridad absoluta de los datos personales de nuestros usuarios.
            </p>
          </div>
          <div className="my-2">
            <h2 className="text-2xl text-gray-900 font-bold">
              Imágenes para adultos
            </h2>
            <p className="mt-4 mb-2 text-lg font-medium text-gray-600 text-justify">
              Las imágenes <strong className="font-bold">para adultos</strong>{" "}
              solo están disponibles para usuarios mayores de 18 años y están
              sujetas a la verificación de edad. Además, los usuarios deben
              marcar claramente las imágenes que son{" "}
              <strong className="font-bold">para adultos</strong> para que los
              demás usuarios puedan identificarlas fácilmente.
            </p>
            <p className="mb-4 mt-2 text-lg font-medium text-gray-600 text-justify">
              Las imágenes <strong className="font-bold">para adultos</strong>{" "}
              solo se pueden visualizar si se ha iniciado sesión y se ha
              verificado la edad. Los usuarios que incumplan estas normas serán
              eliminados de nuestra página web y podrán ser reportados a las
              autoridades pertinentes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
