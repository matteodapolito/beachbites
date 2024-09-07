import {
  OrderElement,
  OrderItem,
  UserSettings,
} from "@/app/constants/constants";
import { OrdersActions } from "@/app/ordina/utils";
import React, { useEffect, useState } from "react";
import { text } from "stream/consumers";

export default function Receipt({ order }: { order: OrderItem }) {
  // Stili inline
  const styles = {
    receipt: {
      width: "300px",
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: "12px",
      padding: "10px",
      margin: "0 auto",
      border: "1px solid black",
    },
    headerFooter: {
      textAlign: "center" as const,
      marginBottom: "35px",
    },
    info: {
      textAlign: "left" as const,
      fontSize: "13px",
    },
    items: {
      marginBottom: "10px",
    },
    item: {
      display: "flex",
      justifyContent: "space-between" as const,
      marginTop: "25px",
    },
    total: {
      fontWeight: "bold" as const,
      display: "flex",
      justifyContent: "space-between" as const,
      marginTop: "50px",
    },
    iva: {
      fontWeight: "200" as const,
      display: "flex",
      justifyContent: "space-between" as const,
    },
  };

  const { getUserSettings } = OrdersActions();
  const [userSettings, setUserSettings] = useState<UserSettings>();

  useEffect(() => {
    getUserSettings()
      .json()
      .then((userSettingsData) => {
        const userStData = userSettingsData as UserSettings;
        setUserSettings(userStData);

        if (
          !userStData.company_address ||
          !userStData.company_name ||
          !userStData.company_phone
        ) {
          alert(
            "Uno dei parametri di configurazione potrebbe non essere completo per una generazione completa della ricevuta. Compila le impostazioni."
          );
        }
      });
  }, []);

  return (
    <div style={styles.receipt}>
      <div style={styles.headerFooter}>
        <p>{userSettings?.company_name}</p>
        <p>{userSettings?.company_address}</p>
        <p>TEL: {userSettings?.company_phone}</p>
      </div>
      <div style={styles.info}>
        <p>
          COMANDA: {order.id} - SLOT: {order.slot_delivery}
        </p>
        <p>
          {order.nome} {order.cognome}
        </p>
        <p>OMBRELLONE: {order.n_ombrellone}</p>
      </div>

      <div style={styles.items}>
        {order.elementi.map((item: OrderElement) => (
          <div key={item.id} style={styles.item}>
            <span>
              {item.prodotto.nome} X {item.quantita}
            </span>
            <span>{Number(item.prezzo_totale).toFixed(2)} EUR</span>
          </div>
        ))}
      </div>

      <div style={styles.headerFooter}>
        <div style={styles.total}>
          <span>TOTALE EURO: </span>
          <span>
            {" "}
            {order.elementi
              .reduce(
                (total, item) => total + (Number(item.prezzo_totale) || 0),
                0
              )
              .toFixed(2)}{" "}
            EUR
          </span>
        </div>
        <div style={styles.iva}>
          <span>di cui IVA: </span>
          <span>
            {" "}
            {(
              order.elementi.reduce(
                (total, item) => total + (Number(item.prezzo_totale) || 0),
                0
              ) * 0.22
            ).toFixed(2)}{" "}
            EUR
          </span>
        </div>
        <p>PAGAMENTO CARTA DI CREDITO</p>
      </div>
    </div>
  );
}
