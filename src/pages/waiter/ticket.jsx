import React, { useContext, useState, useEffect } from "react";
import { StyleContext } from "../../core/StyleContext";
import { Button } from "@heroui/react";
import { QRCodeSVG } from "qrcode.react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { getTicket } from "../../api/waiterApi";
import { useParams } from "react-router-dom";

// Obtener el dominio de las variables de entorno
const domain = import.meta.env.VITE_APP_DOMAIN || 'http://localhost:5173';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  title: {
    fontSize: 18,
    marginBottom: 10
  },
  info: {
    marginBottom: 5
  },
  table: {
    marginTop: 10,
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingVertical: 5
  },
  tableHeader: {
    fontWeight: 'bold'
  },
  tableCell: {
    flex: 1
  },
  total: {
    marginTop: 10,
    textAlign: 'right'
  }
});

// Componente PDF
const TicketPDF = ({ data }) => {
  const iva = data.total - data.subtotal;
  
  return (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Ticket de Compra</Text>
          <Text style={styles.info}>Ticket: {data.ticketId}</Text>
          <Text style={styles.info}>Fecha: {data.fecha}</Text>
          <Text style={styles.info}>Hora: {data.hora}</Text>
          <Text style={styles.info}>Mesero: {data.mesero}</Text>
          <Text style={styles.info}>Mesa: {data.mesa}</Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Producto</Text>
            <Text style={styles.tableCell}>Cant.</Text>
            <Text style={styles.tableCell}>Precio</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.nombre}</Text>
              <Text style={styles.tableCell}>{item.cantidad}</Text>
              <Text style={styles.tableCell}>${item.precio.toFixed(2)}</Text>
              <Text style={styles.tableCell}>${item.subtotal.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.total}>
          <Text>Subtotal: ${data.subtotal.toFixed(2)}</Text>
          <Text>IVA: ${iva.toFixed(2)}</Text>
          <Text style={{ fontWeight: 'bold' }}>Total: ${data.total.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export function Ticket() {
  const { style } = useContext(StyleContext);
  const { sellId } = useParams();
  const qrValue = `${domain}/waiter?sellId=${sellId}`;
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      console.log('Iniciando fetchTicket para sellId:', sellId);
      try {
        setLoading(true);
        setError(null);
        const response = await getTicket(sellId);
        console.log('Respuesta del servidor:', response);
        
        if (response.type === "SUCCESS") {
          console.log('Datos del ticket recibidos:', response.result);
          setTicketData(response.result);
        } else {
          console.error('Error en la respuesta:', response);
          setError("Error al obtener el ticket");
        }
      } catch (err) {
        console.error("Error detallado:", err);
        setError(`Error al conectar con el servidor: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (sellId) {
      fetchTicket();
    } else {
      setError("No se proporcionó ID de venta");
      setLoading(false);
    }
  }, [sellId]);

  const handleDownloadPDF = async () => {
    try {
      setPdfLoading(true);
      console.log('Iniciando generación de PDF...');
      
      // Generar el PDF en memoria
      const blob = await pdf(<TicketPDF data={ticketData} />).toBlob();
      console.log('PDF generado correctamente');
      
      // Crear URL y descargar
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ticket-${ticketData.ticketId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('PDF descargado correctamente');
    } catch (err) {
      console.error('Error al generar PDF:', err);
      setError(`Error al generar PDF: ${err.message}`);
    } finally {
      setPdfLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ backgroundColor: style.BgInterface }}>
        <div className="w-full max-w-sm shadow-2xl rounded-2xl p-6 text-center" style={{ backgroundColor: style.BgCard, color: style.H1 }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: style.H2 }}>
            Cargando Ticket
          </h2>
          <p style={{ color: style.H3 }}>
            Por favor espere mientras se obtiene la información del ticket...
          </p>
          <p className="mt-2 text-sm" style={{ color: style.H3 }}>
            ID de venta: {sellId}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4" style={{ backgroundColor: style.BgInterface }}>
        <div className="w-full max-w-sm shadow-2xl rounded-2xl p-6 text-center" style={{ backgroundColor: style.BgCard, color: style.H1 }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: style.H2 }}>
            Error
          </h2>
          <p style={{ color: style.H3 }}>
            {error}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="w-full py-2 rounded-md mt-4"
            style={{
              background: style.BgButton,
              color: style.P,
            }}
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-4" style={{ backgroundColor: style.BgInterface }}>
      {/* Card de Ticket */}
      <div className="w-full max-w-sm shadow-2xl rounded-2xl p-6" style={{ backgroundColor: style.BgCard, color: style.H1 }}>
        <h2 className="text-xl font-bold mb-4 text-center" style={{ color: style.H2 }}>
          Ticket de Compra
        </h2>
        {ticketData && (
          <div className="space-y-4">
            <div className="text-sm space-y-1" style={{ color: style.H3 }}>
              <p>Ticket: {ticketData.ticketId}</p>
              <p>Fecha: {ticketData.fecha}</p>
              <p>Hora: {ticketData.hora}</p>
              <p>Mesero: {ticketData.mesero}</p>
              <p>Mesa: {ticketData.mesa}</p>
              <p>Subtotal: ${ticketData.subtotal.toFixed(2)}</p>
              <p>IVA: ${(ticketData.total - ticketData.subtotal).toFixed(2)}</p>
              <p>Total: ${ticketData.total.toFixed(2)}</p>
            </div>
            <Button
              onClick={handleDownloadPDF}
              className="w-full py-2 rounded-md"
              style={{
                background: style.BgButton,
                color: style.P,
              }}
              disabled={pdfLoading}
            >
              {pdfLoading ? 'Generando PDF...' : 'Descargar Ticket'}
            </Button>
          </div>
        )}
      </div>

      {/* Card de Calificación */}
      <div className="w-full max-w-sm shadow-2xl rounded-2xl p-6" style={{ backgroundColor: style.BgCard, color: style.H1 }}>
        <h2 className="text-xl font-bold mb-4 text-center" style={{ color: style.H2 }}>
          Califica a tu mesero
        </h2>
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white rounded-lg">
            <QRCodeSVG 
              value={qrValue}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>
        <p className="text-sm text-center mb-4" style={{ color: style.H3 }}>
          Escanea el código QR para calificar la atención de tu mesero
        </p>
        <p className="text-xs text-center opacity-50" style={{ color: style.H3 }}>
          URL: {qrValue}
        </p>
      </div>
    </div>
  );
}
