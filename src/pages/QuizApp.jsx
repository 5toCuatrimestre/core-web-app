import React, { useState } from "react";
// Función para mezclar un arreglo (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const questions = [
  {
    question: "¿Dispositivo que varía su resistencia según la luz que recibe?",
    options: ["Fotoconductor", "Termistor", "Potenciómetro", "Resistor fijo"],
    answer: "Fotoconductor",
  },
  {
    question: "¿Cuál es la diferencia entre un sensor analógico y uno digital?",
    options: [
      "El tipo de señal de salida: Analógico → Continua, Digital → Discreta.",
      "Ambos producen salida digital.",
      "El sensor analógico solo funciona con baterías.",
      "No existe diferencia; ambos generan la misma señal.",
    ],
    answer:
      "El tipo de señal de salida: Analógico → Continua, Digital → Discreta.",
  },
  {
    question: "¿En qué consiste el proceso de adquisición de datos?",
    options: [
      "Transformar una magnitud física en una señal digital.",
      "Enviar datos a la nube para su procesamiento.",
      "Almacenar valores en memorias Flash.",
      "Mejorar la calidad de la señal con filtros.",
    ],
    answer: "Transformar una magnitud física en una señal digital.",
  },
  {
    question: "Función utilizada para regular el brillo de un diodo LED.",
    options: ["analogWrite", "digitalWrite", "setLedLevel", "pwmAdjust"],
    answer: "analogWrite",
  },
  {
    question:
      "¿El comando que se utiliza para declarar variables al inicio de un programa de Arduino?",
    options: ["int.", "let", "var", "double"],
    answer: "int.",
  },
  {
    question:
      "¿Cuál es el primer aspecto a considerar al elegir el hardware para un proyecto IoT?",
    options: [
      "Propósito del proyecto, objetivo y alcance.",
      "El color de la tarjeta de desarrollo.",
      "La disponibilidad de bibliotecas externas.",
      "Si cuenta con antena WiFi integrada.",
    ],
    answer: "Propósito del proyecto, objetivo y alcance.",
  },
  {
    question: "¿Un diodo LED es un actuador?",
    options: [
      "Verdadero.",
      "Falso.",
      "Solo si es LED RGB.",
      "Depende del tipo de LED.",
    ],
    answer: "Verdadero.",
  },
  {
    question: "¿Cuál es una característica de los sensores activos?",
    options: [
      "Requieren una fuente de alimentación para funcionar.",
      "No necesitan alimentación externa.",
      "Son más grandes que los pasivos.",
      "Nunca requieren baterías.",
    ],
    answer: "Requieren una fuente de alimentación para funcionar.",
  },
  {
    question: "¿Cuáles son las tres características principales de un ADC?",
    options: [
      "Resolución, Frecuencia de muestreo, Voltaje de referencia (Vref).",
      "Resistencia, Capacitancia y Frecuencia de reloj.",
      "Voltaje de alimentación, Capacidad de memoria y Puerto serie.",
      "Potencia de salida, Corriente máxima y Tipo de encapsulado.",
    ],
    answer: "Resolución, Frecuencia de muestreo, Voltaje de referencia (Vref).",
  },
  {
    question: "Describe cómo funciona un relevador:",
    options: [
      "Controla el paso de una corriente para encender o apagar dispositivos.",
      "Es un amplificador de alta potencia.",
      "Convierte corriente continua a corriente alterna.",
      "Almacena datos en memoria EEPROM.",
    ],
    answer:
      "Controla el paso de una corriente para encender o apagar dispositivos.",
  },
  {
    question:
      "Dispositivo que detecta un objeto mediante la reflexión que produce en la luz",
    options: [
      "Sensor IR",
      "Sensor ultrasónico",
      "Potenciómetro",
      "Sensor capacitivo",
    ],
    answer: "Sensor IR",
  },
  {
    question:
      "¿Cuál es la principal diferencia entre los sistemas analógicos y digitales?",
    options: [
      "El tipo de señal. Analógico → Va por niveles. Digital → Maneja encendido y apagado.",
      "El analógico solo utiliza 5 V, el digital 3.3 V.",
      "El sistema digital es más antiguo que el analógico.",
      "La señal analógica no requiere cables.",
    ],
    answer:
      "El tipo de señal. Analógico → Va por niveles. Digital → Maneja encendido y apagado.",
  },
  {
    question: "¿Cuál es el primer reto en la adquisición de datos?",
    options: [
      "Transformar una magnitud física en una señal eléctrica.",
      "Comprar los componentes electrónicos adecuados.",
      "Configurar un servidor para almacenar los datos.",
      "Programar una interfaz gráfica.",
    ],
    answer: "Transformar una magnitud física en una señal eléctrica.",
  },
  {
    question: "Función utilizada para obtener los valores de un potenciómetro",
    options: ["analogRead", "digitalRead", "readPot", "readSensor"],
    answer: "analogRead",
  },
  {
    question:
      "¿Cuáles son los tres elementos clave en la adquisición de datos?",
    options: [
      "Sensores, transductores y transmisores.",
      "Actuadores, microcontroladores y cables.",
      "Antenas, módulos WiFi y drivers.",
      "CPU, teclado y monitor.",
    ],
    answer: "Sensores, transductores y transmisores.",
  },
  {
    question:
      "¿Cuál es el primer aspecto a considerar al elegir el hardware para un proyecto IoT?",
    options: [
      "Propósito",
      "La potencia del procesador",
      "La marca del fabricante",
      "El color de la placa",
    ],
    answer: "Propósito",
  },
  {
    question: "¿Un relevador es un sensor eléctrico?",
    options: [
      "Falso.",
      "Verdadero.",
      "Solo en circuitos analógicos.",
      "Depende del voltaje.",
    ],
    answer: "Falso.",
  },
  {
    question: "¿Cuál es una característica de los sensores activos?",
    options: [
      "Tienen una salida analógica continua.",
      "No requieren alimentación externa.",
      "Solo funcionan con microcontroladores ARM.",
      "Usan comunicación digital I2C.",
    ],
    answer: "Tienen una salida analógica continua.",
  },
  {
    question: "¿Qué es un actuador?",
    options: [
      "Es aquel que necesita de una acción para funcionar.",
      "Es un dispositivo que mide una magnitud física.",
      "Un dispositivo que convierte energía solar en electricidad.",
      "Un sensor de temperatura infrarrojo.",
    ],
    answer: "Es aquel que necesita de una acción para funcionar.",
  },
  {
    question: "¿Qué es pwm?",
    options: [
      "TÉCNICA que simula una señal analógica",
      "Un tipo de sensor de movimiento",
      "Un protocolo de comunicación serial",
      "Una función para leer valores digitales",
    ],
    answer: "TÉCNICA que simula una señal analógica",
  },
  {
    question: "Función principal de un sensor:",
    options: [
      "Detecta el cambio de una magnitud física.",
      "Almacenar datos en memoria EEPROM.",
      "Proveer alimentación a un actuador.",
      "Transmitir datos vía WiFi.",
    ],
    answer: "Detecta el cambio de una magnitud física.",
  },
  {
    question:
      "¿Cuál es la diferencia entre un sensor pasivo y un sensor activo?",
    options: [
      "Pasivo: No necesita energía externa. Activo: Requiere alimentación para funcionar.",
      "Pasivo: Produce señal digital. Activo: Produce señal analógica.",
      "No hay diferencia; ambos necesitan fuente externa.",
      "El sensor pasivo está hecho de plástico y el activo de metal.",
    ],
    answer:
      "Pasivo: No necesita energía externa. Activo: Requiere alimentación para funcionar.",
  },
  {
    question:
      "¿Qué tipo de sensor se usa para medir la humedad en el ambiente?",
    options: [
      "Sensor de humedad (DHT11, DHT22).",
      "Sensor IR.",
      "Fotoconductor.",
      "Sensor de fuerza (FSR).",
    ],
    answer: "Sensor de humedad (DHT11, DHT22).",
  },
  {
    question: "¿Cuál es la función principal de un actuador en un sistema IoT?",
    options: [
      "Convertir señales eléctricas en acciones físicas.",
      "Medir la temperatura ambiente.",
      "Enviar datos a la nube.",
      "Detener la ejecución del programa.",
    ],
    answer: "Convertir señales eléctricas en acciones físicas.",
  },
  {
    question:
      "¿Cómo funciona un servomotor y qué lo diferencia de un motor de corriente continua (DC)?",
    options: [
      "Servomotor: Control de posición y ángulo. Motor DC: Gira sin control preciso de posición.",
      "Servomotor: Funciona solo a 5 V. Motor DC: Funciona a cualquier voltaje.",
      "El servomotor es más barato que el DC.",
      "El motor DC es digital y el servomotor es analógico.",
    ],
    answer:
      "Servomotor: Control de posición y ángulo. Motor DC: Gira sin control preciso de posición.",
  },
  {
    question:
      "¿Cuál es la diferencia entre un sensor de proximidad ultrasónico y un sensor IR?",
    options: [
      "Ultrasónico: Usa ondas de sonido. IR: Usa luz infrarroja.",
      "No hay diferencia, ambos se basan en pulsos de luz.",
      "El ultrasónico funciona solo de noche, el IR solo de día.",
      "El IR mide humedad y el ultrasónico mide temperatura.",
    ],
    answer: "Ultrasónico: Usa ondas de sonido. IR: Usa luz infrarroja.",
  },
  {
    question:
      "¿Qué tipo de sensor se usa para medir la temperatura corporal y cuál para la temperatura ambiental?",
    options: [
      "Corporal: MLX90614, TMP36. Ambiental: DHT11, DHT22, LM35.",
      "Corporal: DHT22. Ambiental: MLX90614.",
      "Corporal: LM35. Ambiental: DS18B20.",
      "Corporal: NTC. Ambiental: RTC.",
    ],
    answer: "Corporal: MLX90614, TMP36. Ambiental: DHT11, DHT22, LM35.",
  },
  {
    question:
      "¿Cuál es la diferencia entre un sensor de presión y un sensor de fuerza?",
    options: [
      "Presión: Detecta fuerza distribuida en un área. Fuerza: Mide una fuerza aplicada en un punto.",
      "El de presión siempre es digital y el de fuerza es analógico.",
      "Ambos son idénticos, sin diferencia funcional.",
      "El sensor de fuerza trabaja solo a altas temperaturas.",
    ],
    answer:
      "Presión: Detecta fuerza distribuida en un área. Fuerza: Mide una fuerza aplicada en un punto.",
  },
  {
    question:
      "¿Cuál es el papel de los transductores en la adquisición de datos?",
    options: [
      "Convertir una magnitud física en señal eléctrica.",
      "Generar ruido en la señal de salida.",
      "Simular datos analógicos con pulsos digitales.",
      "Realizar cálculos de inteligencia artificial.",
    ],
    answer: "Convertir una magnitud física en señal eléctrica.",
  },
  {
    question:
      "¿Qué es el ruido en la señal de un sensor y cómo puede minimizarse?",
    options: [
      "Variaciones no deseadas en la señal. Se reduce con filtros y buen cableado.",
      "La señal útil que produce el sensor. Aumenta con amplificadores.",
      "Una señal creada intencionalmente para probar el sistema.",
      "No existe el ruido en sensores digitales.",
    ],
    answer:
      "Variaciones no deseadas en la señal. Se reduce con filtros y buen cableado.",
  },
  {
    question:
      "¿Cómo influye la resolución de un ADC en la precisión de los datos obtenidos?",
    options: [
      "Mayor resolución = Mayor precisión.",
      "No influye en absoluto.",
      "A menor resolución, la conversión es más exacta.",
      "La resolución solo afecta la velocidad de muestreo.",
    ],
    answer: "Mayor resolución = Mayor precisión.",
  },
  {
    question:
      "¿Por qué es importante la frecuencia de muestreo en la digitalización de señales?",
    options: [
      "Evita la pérdida de información y aliasing.",
      "Permite la comunicación inalámbrica.",
      "Mejora la conductividad eléctrica.",
      "Aumenta la duración de la batería.",
    ],
    answer: "Evita la pérdida de información y aliasing.",
  },
  {
    question:
      "¿Cómo se puede mejorar la exactitud de un sensor en un sistema IoT?",
    options: [
      "Calibración y uso de filtros.",
      "Disminuyendo la frecuencia de muestreo.",
      "Usando siempre señales digitales.",
      "Implementando un retardo (delay) muy largo.",
    ],
    answer: "Calibración y uso de filtros.",
  },
  {
    question:
      "¿Qué ocurre si la frecuencia de muestreo es menor al doble de la frecuencia del fenómeno a medir?",
    options: [
      "Ocurre aliasing (datos erróneos).",
      "No sucede nada, la señal es clara.",
      "Se reduce el tamaño de la señal.",
      "La señal se vuelve completamente digital.",
    ],
    answer: "Ocurre aliasing (datos erróneos).",
  },
  {
    question:
      "¿Cómo se calibra un sensor analógico para obtener mediciones precisas?",
    options: [
      "Comparación con valores de referencia y ajuste de ecuaciones.",
      "Se promedian lecturas al azar sin referencia.",
      "Se desconecta el sensor durante 24 horas.",
      "No se puede calibrar un sensor analógico.",
    ],
    answer: "Comparación con valores de referencia y ajuste de ecuaciones.",
  },
  {
    question:
      "¿Por qué en algunos casos se utilizan filtros en la adquisición de datos?",
    options: [
      "Para reducir ruido y mejorar precisión.",
      "Para amplificar el ruido y detectar fallas.",
      "Para convertir señales digitales en analógicas.",
      "Porque son obligatorios en todas las lecturas.",
    ],
    answer: "Para reducir ruido y mejorar precisión.",
  },
  {
    question:
      "¿Cuál es el impacto del voltaje de referencia en la precisión de un ADC?",
    options: [
      "Define el rango de conversión y la sensibilidad.",
      "No afecta, siempre es de 5 V.",
      "Determina la frecuencia de muestreo.",
      "Permite que el ADC funcione como sensor digital.",
    ],
    answer: "Define el rango de conversión y la sensibilidad.",
  },
  {
    question:
      "¿Qué función se utiliza en Arduino para enviar datos por comunicación serial?",
    options: [
      "Serial.print() o Serial.println().",
      "analogWrite().",
      "pinMode().",
      "digitalRead().",
    ],
    answer: "Serial.print() o Serial.println().",
  },
  {
    question:
      "¿Qué tipo de variable se usa para almacenar valores de un sensor de temperatura en Arduino?",
    options: [
      "float (para valores decimales).",
      "int (para valores enteros).",
      "bool (para verdadero/falso).",
      "char (para cadenas de caracteres).",
    ],
    answer: "float (para valores decimales).",
  },
  {
    question: "¿Cuál es la función de pinMode() en un programa de Arduino?",
    options: [
      "Configura un pin como entrada o salida.",
      "Envía datos por serial.",
      "Lee la temperatura.",
      "Verifica la conexión WiFi.",
    ],
    answer: "Configura un pin como entrada o salida.",
  },
  {
    question:
      "¿Cuál es la diferencia entre digitalRead() y analogRead() en Arduino?",
    options: [
      "digitalRead(): Lee 0 o 1. analogRead(): Lee valores entre 0 y 1023 (en un ADC de 10 bits).",
      "digitalRead(): Lee valores decimales. analogRead(): Solo lee 0 o 1.",
      "No existe analogRead() en Arduino.",
      "Ambas cumplen la misma función.",
    ],
    answer:
      "digitalRead(): Lee 0 o 1. analogRead(): Lee valores entre 0 y 1023 (en un ADC de 10 bits).",
  },
  {
    question: "¿Cómo se define una salida PWM en Arduino?",
    options: [
      "Con analogWrite(pin, valor).",
      "Con digitalWrite(pin, HIGH).",
      "Con pwmWrite(pin, nivel).",
      "Con Serial.printPWM(pin).",
    ],
    answer: "Con analogWrite(pin, valor).",
  },
  {
    question: "¿Cómo se configura un pin como salida en un microcontrolador?",
    options: [
      "Usando pinMode(pin, OUTPUT);",
      "Con digitalWrite(pin, HIGH);",
      "Con setPin(pin, out);",
      "No se configura, todos los pines son entradas por defecto.",
    ],
    answer: "Usando pinMode(pin, OUTPUT);",
  },
  {
    question: "¿Cuál es la diferencia entre delay() y millis() en Arduino?",
    options: [
      "delay(): Pausa el código. millis(): Cuenta el tiempo sin detener la ejecución.",
      "delay(): Cuenta el tiempo sin detener la ejecución. millis(): Pausa el código.",
      "Ambas detienen la ejecución del programa.",
      "Ninguna de las anteriores.",
    ],
    answer:
      "delay(): Pausa el código. millis(): Cuenta el tiempo sin detener la ejecución.",
  },
];

const QuizApp = () => {
  // 1) Mezclar todas las preguntas
  // 2) Mezclar las opciones de cada pregunta
  const initialQuestionFlow = shuffleArray(
    questions.map((q) => {
      return {
        ...q,
        options: shuffleArray(q.options),
      };
    })
  );

  // Arreglo de preguntas en orden aleatorio
  const [questionFlow, setQuestionFlow] = useState(initialQuestionFlow);

  // Índice de la pregunta actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // ¿Cuántas se han contestado? (aparece en la interfaz)
  // Aquí reflejamos las que se han “validado” como correctas.
  const [answeredCount, setAnsweredCount] = useState(0);

  // Respuesta seleccionada
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Feedback de la respuesta actual
  const [feedback, setFeedback] = useState("");

  // Obtener la pregunta actual
  const currentQuestion = questionFlow[currentIndex] || null;

  // Manejar el clic en una opción
  const handleAnswerClick = (option) => {
    if (!currentQuestion) return;
    setSelectedAnswer(option);

    if (option === currentQuestion.answer) {
      setFeedback("Correcto");
    } else {
      setFeedback("Incorrecto");
    }
  };

  // Pasar a la siguiente pregunta
  // Solo se permite pasar si la respuesta es correcta
  const handleNext = () => {
    if (feedback !== "Correcto") return; // Evita avanzar si está mal

    // Incrementa el conteo de preguntas correctas
    setAnsweredCount(answeredCount + 1);

    // Avanza al siguiente índice
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next < questionFlow.length ? next : prev;
    });

    // Reinicia la selección y el feedback
    setSelectedAnswer(null);
    setFeedback("");
  };

  // Retroceder a la pregunta anterior
  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      return next >= 0 ? next : 0; // Evita que sea < 0
    });

    // Asumiendo que al regresar no borramos la respuesta ya dada,
    // podrías resetear aquí si quisieras.
    setSelectedAnswer(null);
    setFeedback("");
  };

  // Reiniciar sesión (volver a mezclar todo)
  const resetSession = () => {
    // Mezclar las preguntas y sus opciones de nuevo
    const newQuestionFlow = shuffleArray(
      questions.map((q) => {
        return {
          ...q,
          options: shuffleArray(q.options),
        };
      })
    );
    setQuestionFlow(newQuestionFlow);
    setCurrentIndex(0);
    setAnsweredCount(0);
    setSelectedAnswer(null);
    setFeedback("");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {/* Muestra el progreso */}
      <p className="mb-2">
        Preguntas respondidas: {answeredCount} / {questions.length}
      </p>

      {/* Si no hay pregunta actual, significa que terminamos */}
      {currentQuestion ? (
        <>
          {/* Título de la pregunta */}
          <h2 className="text-lg font-bold">{currentQuestion.question}</h2>

          {/* Opciones (aleatorias) */}
          <ul className="mt-2">
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                className={`
                    p-2 border rounded-lg cursor-pointer mt-2
                    ${selectedAnswer === option ? "bg-blue-300" : "bg-gray-100"}
                  `}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </li>
            ))}
          </ul>

          {/* Muestra el feedback */}
          {feedback && <p className="mt-4 font-bold">{feedback}</p>}

          {/* Botones Anterior / Siguiente */}
          <div className="mt-4 flex gap-2">
            {/* Botón para regresar pregunta */}
            {currentIndex > 0 && (
              <button
                className="p-2 bg-yellow-500 text-white rounded-lg"
                onClick={handlePrev}
              >
                Anterior
              </button>
            )}

            {/* Botón para avanzar a la siguiente pregunta
                  Solo se habilita si la respuesta es correcta */}
            <button
              className="p-2 bg-blue-500 text-white rounded-lg"
              onClick={handleNext}
              disabled={feedback !== "Correcto"}
            >
              Siguiente
            </button>
          </div>
        </>
      ) : (
        <p className="font-bold">¡Has respondido todas las preguntas!</p>
      )}

      {/* Botón para reiniciar */}
      <button
        className="mt-4 ml-4 p-2 bg-green-500 text-white rounded-lg"
        onClick={resetSession}
      >
        Reiniciar Sesión
      </button>
    </div>
  );
};

export default QuizApp;
