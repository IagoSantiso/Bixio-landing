"use client";

import { useMemo, useState } from "react";
import { PLANS, RETENTION } from "@/lib/pricing";
import { WaitlistForm } from "./WaitlistForm";

const annualPlan = PLANS.find((plan) => plan.id === "particulares")!;
const COMMISSION_RATE = 0.4;

const euros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/**
 * Devuelve dos cifras a propósito: la comisión, que es pequeña y honesta, y el
 * valor de retención, que es el argumento de verdad. Enseñar solo la primera
 * haría el mismo daño que hacía la página antes de reordenarla.
 */
export function PartnerCalculator() {
  const [units, setUnits] = useState(100);
  const [occupancy, setOccupancy] = useState(80);
  const [price, setPrice] = useState(110);
  const [adoption, setAdoption] = useState(20);
  const [retained, setRetained] = useState(5);

  const result = useMemo(() => {
    const activeCustomers = Math.round((units * occupancy) / 100);
    const buyers = Math.round((activeCustomers * adoption) / 100);
    const commission = buyers * annualPlan.amount * COMMISSION_RATE;
    const retainedCustomers = Math.round((activeCustomers * retained) / 100);
    const retentionValue = retainedCustomers * price;
    return { activeCustomers, buyers, commission, retainedCustomers, retentionValue };
  }, [units, occupancy, price, adoption, retained]);

  return (
    <div className="calc">
      <div className="calc-inputs">
        <Field
          label="Unidades del centro"
          value={units}
          min={5}
          max={1000}
          step={5}
          onChange={setUnits}
        />
        <Field
          label="Ocupación media"
          suffix="%"
          value={occupancy}
          min={10}
          max={100}
          step={5}
          onChange={setOccupancy}
        />
        <Field
          label="Precio medio por unidad y mes"
          suffix="€"
          value={price}
          min={30}
          max={400}
          step={5}
          onChange={setPrice}
        />
        <Field
          label="Clientes que contratan Bixio"
          suffix="%"
          value={adoption}
          min={1}
          max={100}
          step={1}
          onChange={setAdoption}
        />
        <Field
          label="Clientes que se quedan un mes más"
          suffix="%"
          value={retained}
          min={1}
          max={50}
          step={1}
          onChange={setRetained}
        />
      </div>

      <div className="calc-results">
        <div className="calc-card">
          <div className="calc-label">Comisión estimada el primer año</div>
          <div className="calc-number">{euros.format(result.commission)}</div>
          <p>
            {result.buyers} clientes de {result.activeCustomers} activos contratan el plan de{" "}
            {annualPlan.price}, y te llevas el 40 % de cada venta.
          </p>
        </div>

        <div className="calc-card calc-card-strong">
          <div className="calc-label">Valor de retener un mes más</div>
          <div className="calc-number">{euros.format(result.retentionValue)}</div>
          <p>
            Si {result.retainedCustomers} clientes tardan un mes más en vaciar su box, a{" "}
            {euros.format(price)} por unidad y mes.
          </p>
        </div>
      </div>

      <p className="calc-note">
        Las cifras salen de los valores que has puesto arriba: son una simulación, no una previsión.
        El rango habitual de facturación por unidad y mes en España va de{" "}
        {RETENTION.monthlyUnitRevenueLow} a {RETENTION.monthlyUnitRevenueHigh} € según ciudad y
        tamaño.
      </p>

      <div className="calc-capture">
        <h3>¿Te mandamos este cálculo por escrito?</h3>
        <p>Con tus números y las condiciones de fundador, para que puedas enseñárselo a tu socio.</p>
        <WaitlistForm origin="/trasteros/calculadora" cta="calculadora" partner />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (value: number) => void;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="calc-field">
      <label htmlFor={id}>
        {label}
        <output htmlFor={id}>
          {value}
          {suffix ? ` ${suffix}` : ""}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
