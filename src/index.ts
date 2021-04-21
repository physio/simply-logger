export class Logger {
  private readonly _logger: any;
  private readonly _pino: any;
  private _prefix: string;
  private _layoutPrefix: string;





  /**
   * Istance the class
   *
   * @date 2021-03-01
   * @param {any} name:string="myapp"
   * @param {any} lev:string="debug"
   * @param {any} layout:string=null
   * @returns {any}
   */
  constructor(name: string = "myapp", lev: string = "debug", layout: string = "") {
    this._prefix = name;
    this._pino = require("pino");
    this._layoutPrefix = (layout == null) ? `[ ${this._prefix} ] >` : layout;

    this._logger = require("pino")(
      {
        name: this._prefix,
        level: lev,
        prettyPrint:
          {
            levelFirst: true,
            translateTime: "SYS:yyyy-mm-dd HH:MM:ss"
          },
        // tslint:disable-next-line: object-literal-sort-keys
        prettifier: require("pino-pretty")
      }
    );
  }





  /**
   * Print an Error
   *
   * @date 2021-03-01
   * @param {any} dirtyStr:any
   * @returns {any}
   */
  public printError(dirtyStr: any): void {
    const str = this._getPrefixLayout(dirtyStr);
    const status = this._alsoTowardsDisplay(str);
    if (!status) {
        this._logger.error(str);
    }
  }





  /**
   * Print a Critical
   *
   * @date 2021-03-01
   * @param {any} dirtyStr:any
   * @returns {any}
   */
  public printCritical(dirtyStr: any): void {
    const str = this._getPrefixLayout(dirtyStr);
    const status = this._alsoTowardsDisplay(str);
    if (!status) {
        this._logger.error(str);
        this._logger.error(`Exit program... :-(`);
    }
  }





  /**
   * Print a Warning
   *
   * @date 2021-03-01
   * @param {any} dirtyStr:string
   * @returns {any}
   */
  public printWarn(dirtyStr: string): void {
    const str = this._getPrefixLayout(dirtyStr);
    this._logger.warn(str);
  }





  /**
   * Print a Debug
   * @date 2021-03-01
   * @param {any} dirtyStr:string
   * @returns {any}
   */
  public printDebug(dirtyStr: string): void {
    const str = this._getPrefixLayout(dirtyStr);
    this._logger.debug(str);
  }





  /**
   * Print a Info
   * @date 2021-03-01
   * @param {any} dirtyStr:string
   * @returns {any}
   */
  public printInfo(dirtyStr: string) {
    const str = this._getPrefixLayout(dirtyStr);
    this._logger.info(str);
  }


  /**
   * Print a Trace
   * @author Gallo Mauro <mauro.gallo@polin.it>
   * @date 2021-03-01
   * @param {any} dirtyStr:string
   * @returns {any}
   */
  public printTrace(dirtyStr: string) {
    const str = this._getPrefixLayout(dirtyStr);
    this._logger.trace(str);
  }





  /**
   * Evaluate if show the message to Display
   *
   * @date 2021-03-01
   * @param {any} obj:any
   * @returns {any}
   */
  private _alsoTowardsDisplay(obj: any): boolean {
    const errorsToIgnore = ["EINVAL", "ECONNREFUSED", "ETIMEDOUT"];
    if (obj.hasOwnProperty("code")) {
      const value = obj.code;
      return (errorsToIgnore.indexOf(value) > -1);
    }
    return true;
  }





  /**
   * Get the prefix of message
   *
   * @date 2021-03-01
   * @param {any} message:string
   * @returns {any}
   */
  private _getPrefixLayout(message: string): string {
    return `${this._layoutPrefix} ${message}`;
  }
}
