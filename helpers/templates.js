
module.exports.welcomeTemplate = (username, password) => {
    return `
  <div
  style="
    font-family: sans-serif;
    font-size: 14px;
    line-height: 1.4;
    background-color: #f6f6f6;
    margin: 0;
    padding: 0;
  "
>
  <table
    border="0"
    cellpadding="0"
    cellspacing="0"
    style="border-collapse: separate; background-color: #f6f6f6; width: 100%"
    width="100%"
  >
    <tbody>
      <tr>
        <td
          style="
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top;
            max-width: 580px;
            padding: 10px;
            width: 580px;
            margin: 0 auto;
          "
          width="580"
          valign="top"
        >
          <div
            style="
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 580px;
              padding: 10px;
            "
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="
                border-collapse: separate;
                background: #fff;
                border-radius: 3px;
                width: 100%;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      font-family: sans-serif;
                      font-size: 14px;
                      vertical-align: top;
                      box-sizing: border-box;
                      padding: 20px;
                    "
                    valign="top"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="border-collapse: separate; width: 100%"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              vertical-align: top;
                            "
                            valign="top"
                          >
                            <div
                              style="text-align: center; margin-bottom: 30px"
                            >
                              <img
                                width="200px"
                                src="cid:logo.png"
                                alt="logo"
                              />
                            </div>
                            <p
                              style="
                                font-family: sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                              "
                            >
                              Bienvenido!

                              Tus credenciales para ingresar a Slabcode son las siguientes:
                              
                            </p>
                            <p
                              style="
                                font-family: sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                              "
                            >
                              Usuario: ${username}
                            </p>
                            <p
                              style="
                                font-family: sans-serif;
                                font-size: 14px;
                                font-weight: normal;
                                margin: 0;
                                margin-bottom: 15px;
                              "
                            >                              
                              Contraseña: ${password}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <div
              style="
                clear: both;
                padding-top: 10px;
                text-align: center;
                width: 100%;
              "
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                style="border-collapse: separate; width: 100%"
                width="100%"
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        font-family: sans-serif;
                        vertical-align: top;
                        padding-top: 10px;
                        padding-bottom: 10px;
                        color: #999999;
                        font-size: 12px;
                        text-align: center;
                      "
                      valign="top"
                      align="center"
                    >
                      Powered by
                      <a
                        href="https://lenware.io"
                        style="
                          color: #999999;
                          font-size: 12px;
                          text-align: center;
                          text-decoration: none;
                        "
                        target="_blank"
                        >Slabcode</a
                      >.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;
};

module.exports.projectDoneTemplate = (projectName) => {
  return `
<div
style="
  font-family: sans-serif;
  font-size: 14px;
  line-height: 1.4;
  background-color: #f6f6f6;
  margin: 0;
  padding: 0;
"
>
<table
  border="0"
  cellpadding="0"
  cellspacing="0"
  style="border-collapse: separate; background-color: #f6f6f6; width: 100%"
  width="100%"
>
  <tbody>
    <tr>
      <td
        style="
          font-family: sans-serif;
          font-size: 14px;
          vertical-align: top;
          max-width: 580px;
          padding: 10px;
          width: 580px;
          margin: 0 auto;
        "
        width="580"
        valign="top"
      >
        <div
          style="
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px;
          "
        >
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="
              border-collapse: separate;
              background: #fff;
              border-radius: 3px;
              width: 100%;
            "
            width="100%"
          >
            <tbody>
              <tr>
                <td
                  style="
                    font-family: sans-serif;
                    font-size: 14px;
                    vertical-align: top;
                    box-sizing: border-box;
                    padding: 20px;
                  "
                  valign="top"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style="border-collapse: separate; width: 100%"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            font-family: sans-serif;
                            font-size: 14px;
                            vertical-align: top;
                          "
                          valign="top"
                        >
                          <div
                            style="text-align: center; margin-bottom: 30px"
                          >
                            <img
                              width="200px"
                              src="cid:logo.png"
                              alt="logo"
                            />
                          </div>
                          <p
                            style="
                              font-family: sans-serif;
                              font-size: 14px;
                              font-weight: normal;
                              margin: 0;
                              margin-bottom: 15px;
                            "
                          >
                            Enhorabuena!
                            El proyecto ${projectName} ha sido culminado!! 
                          </p>
                          
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style="
              clear: both;
              padding-top: 10px;
              text-align: center;
              width: 100%;
            "
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="border-collapse: separate; width: 100%"
              width="100%"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      font-family: sans-serif;
                      vertical-align: top;
                      padding-top: 10px;
                      padding-bottom: 10px;
                      color: #999999;
                      font-size: 12px;
                      text-align: center;
                    "
                    valign="top"
                    align="center"
                  >
                    Powered by
                    <a
                      href="https://lenware.io"
                      style="
                        color: #999999;
                        font-size: 12px;
                        text-align: center;
                        text-decoration: none;
                      "
                      target="_blank"
                      >Slabcode</a
                    >.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
`;
};