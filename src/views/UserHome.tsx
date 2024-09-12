import { ArrowUp, MailIcon } from "../commons/icons";

export const UserHome = () => {
  return (
    <section className="userHome-container">
      <div className="userHome-internal-container">
        <div className="userHome-internal-top-container">
          <div className="left-container">
            <div className="icon-conteiner">
              <MailIcon />
            </div>
            <h4>Cuentas</h4>
          </div>
          <div className="right-container">
            <div className="icon-conteiner">
              <ArrowUp onClick={() => {}} />
            </div>
          </div>
        </div>

        <div className="userHome-internal-bottom-container">
          <h3>Caja de ahorro</h3>

          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>
                  <strong>Número</strong>
                </th>
                <th>Saldo disponible</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CUENTA SUELDO</td>
                <td>...4593</td>
                <td>$2.000.563</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
