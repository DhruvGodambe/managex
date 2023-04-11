import { sign } from "crypto";
import { ethers } from "ethers";
import React, { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useAccount, useProvider, useSigner } from "wagmi";
import portfolioManagerABI from "../../abis/portfolioManager.json";
import { assets } from "@/constants/assets";
import ERC20 from "../../abis/erc20.json";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { toast } from "react-toastify";

export const DepositUSDCPopup = ({
  closeModal,
  setShowPortfolio,
  setPortfolioManager,
  setFundingTokenBalance
}: any) => {
  const [selectedAssets, setSelectedAssets] = useState([0, 0, 0, 0, 0]);
  const [assetList, setAssetList] = useState(assets);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const provider = useProvider();

  const handleConfirm = async () => {
    setStep(1);
  };

  const handleChange = (e: any) => {
    setDepositAmount(e.target.value);
  };

  return (
    <div className="modal">
      <div className="overlay">
        <div
          className="modal-content"
          style={{
            width: "50%",
            top: "30%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h1>Deposit USDC</h1>
            <div
              style={{
                marginLeft: "45%",
                alignSelf: "center",
              }}
              onClick={closeModal}
            >
              <img
                style={{
                  width: "25px",
                }}
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png"
              />
            </div>
          </div>
          {!loading ? (
            step == 0 ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    margin: "20px 0",
                  }}
                >
                  <p style={{ margin: "0 10px" }}>Enter Amount</p>
                  <input type="number" onChange={handleChange} />
                </div>
                <button
                  style={{
                    marginLeft: "75%",
                    fontSize: "20px",
                    padding: "5px 20px",
                  }}
                  onClick={handleConfirm}
                >
                  Deposit
                </button>
              </div>
            ) : (
              <ConfirmDeposit
                depositAmount={depositAmount}
                setLoading={setLoading}
                closeModal={closeModal}
                setFundingTokenBalance={setFundingTokenBalance}
              />
            )
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#49abf5"
                  ariaLabel="ball-triangle-loading"
                  visible={true}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p style={{ fontSize: "20px" }}>Transaction processing...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConfirmDeposit = ({ depositAmount, setLoading, closeModal, setFundingTokenBalance }: any) => {
  const provider = useProvider();
  const { address: connectedAddress }: any = useAccount();

  const portfolioManager = localStorage.getItem("portfolioManager") || "";
  const { config } = usePrepareContractWrite({
    address: "0x29FeC84bED2D86A7d520F26275D61fc635Ab381e",
    abi: ERC20.abi,
    functionName: "transfer",
    args: [portfolioManager, depositAmount.toString() + "000000"],
  });
  const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite({
    ...config,
    async onSuccess(data) {
      setLoading(false);
      const balance = await getTokenBalance("0x29FeC84bED2D86A7d520F26275D61fc635Ab381e")

      toast("Transaction submitted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const receipt = await data.wait();

      toast.success(`${depositAmount} USDC deposited`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })

    setFundingTokenBalance(parseFloat(balance) + parseFloat(depositAmount))
      closeModal();
    },
  });

  async function getTokenBalance(address: string) {
    const providerUrl =
      "https://polygon-mumbai.g.alchemy.com/v2/EV43LGYLxvW7eOpMCuopojpLRrhwrR6Y";

    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const erc20 = new ethers.Contract(address, ERC20.abi, provider);
    const balance = await erc20.balanceOf(portfolioManager);
    const decimals = await erc20.decimals();
    const readableBalance = ethers.utils.formatUnits(
      balance.toString(),
      decimals.toString()
    );
    return readableBalance;
  }

  const handleConfirm = async () => {
    writeAsync?.();
    setLoading(true);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "20px 0",
        }}
      >
        <p style={{ margin: "0 10px" }}>
          Are you sure you want to deposit {depositAmount} USDC?{" "}
        </p>
      </div>
      <button
        style={{
          marginLeft: "75%",
          fontSize: "20px",
          padding: "5px 20px",
        }}
        onClick={handleConfirm}
      >
        Confirm
      </button>
    </div>
  );
};
