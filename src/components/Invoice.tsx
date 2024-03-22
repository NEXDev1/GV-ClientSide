
import Logo from "../images/Logo.png";

const Invoice = () => {
  // Sample invoice data
  const invoiceData = {
    invoiceNumber: "INV-001",
    date: "2024-03-14",
    items: [
      { id: 1, name: "Item 1", quantity: 2, price: 10 },
      { id: 2, name: "Item 2", quantity: 1, price: 20 },
      // Add more items as needed
    ],
    taxRate: 0.1, // 10% tax rate
  };

  // Calculate subtotal
  const subtotal = invoiceData.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Calculate total tax
  const totalTax = subtotal * invoiceData.taxRate;

  // Calculate total amount
  const totalAmount = subtotal + totalTax;

 
  return (
    <div
      className=" flex-1 justify-around items-center"
      style={{  alignItems: "center" }}
    >
    
      <center>
        <img src={Logo} alt="Logo" style={{ width: "100px", height: "auto" }} />
      </center>
      <center>
        <h1 className="text-3xl font-bold text-black ">
          Partner Revenue Report
        </h1>
        <br></br>
      </center>
      <center>
        <h1 className="  text-black ">for the month of</h1>
      </center>
      <hr className="border-black border-b-2" />
      <h2>Invoice #{invoiceData.invoiceNumber}</h2>
      <div className="invoice-date">Date: {invoiceData.date}</div>
      <hr className="border-black border-b-2" />
      <table className="revenue-table" style={{ padding: "8px" }}>
        <tbody>
          <tr>
            <td>YouTube revenue</td>
            <td className="amount">$102.64</td>
          </tr>
          <tr>
            <td>Withholding TAX on US revenue</td>
            <td className="amount">-$1.87</td>
          </tr>
          <tr>
            <td style={{ paddingRight: "80px" }}>YouTube revenue after TAX </td>
            <td className="amount">$100.78</td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td>Partner revenue share </td>
            <td className="amount">70%</td>
          </tr>
          <tr>
            <td>Partner revenue amount </td>
            <td className="amount">$70.54</td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td> </td>
          </tr>
          <tr>
            <td>Facebook total receivables </td>
            <td className="amount">$0.00</td>
          </tr>
          <tr>
            <td>Other revenue/payments </td>
            <td className="amount">$0.00</td>
          </tr>
        </tbody>
      </table>

      <div className="invoice-total mb-20">
        <hr className="border-black " />
        <div>
          <strong>Total: ${totalAmount}</strong>
        </div>
        <div>Conversion rate (INR) : ${totalAmount}</div>
        <div>November PAYOUT (in INR) : ${totalAmount}</div>
      </div>
     
      <div className="mb-20">
        <i><p className=" text-gray-400">
          Note: This is a system-generated report. Any discrepancy in the report
          must be notified in writing within 60 days from the date of the
          statement. Otherwise, this report will be considered correct.
        </p></i>
      </div>
      <div className="mb-20">
      <center>
        <i><p>This report was automatically generated on 02-Jan-23 5:09 PM</p></i>
      </center>
      </div>
      <hr className="border-b-red-600 border-b-8 " />
    </div>
  );
};

export default Invoice;
