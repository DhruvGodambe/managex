import React, { use, useEffect, useState } from "react";
import { CreateFundModal } from "./CreateFundModal";
import portfolioManagerABI from "../../abis/portfolioManager.json";
import { toast, ToastContainer } from "react-toastify";
import { ethers } from "ethers";
import {
  useProvider,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import Switch from "react-switch";
import { assets } from "@/constants/assets";
import ERC20 from "../../abis/erc20.json";
import { DepositUSDCPopup } from "./DepositUSDCPopup";

const modalStyles: any = {
  width: "250px",
  background: "red",
};

export default function Dashboard() {
  let subtitle: any;
  let modal: any;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [portfolioManager, setPortfolioManager] = useState({});
  const provider = useProvider();
  const [autoBalance, setAutoBalance] = useState(false);
  const [portfolioAssets, setPortfolioAssets] = useState([]);
  const { address: connectedAddress }: any = useAccount();
  const [depositPopup, setDepositPopup] = useState(false);
  const [fundingTokenBalance, setFundingTokenBalance] = useState(0.0);
  const [portfolioBalanceList, setPortfolioBalanceList] = useState([]);

  let portfolioManagerAddress: any;
  if (typeof window !== "undefined") {
    portfolioManagerAddress = localStorage.getItem("portfolioManager") || "";
  }
  const { config } = usePrepareContractWrite({
    address: portfolioManagerAddress,
    abi: portfolioManagerABI.abi,
    functionName: "balancePortfolio",
  });
  const { data, isLoading, isSuccess, write, writeAsync } = useContractWrite({
    ...config,
    async onSuccess(data) {
      toast("Transaction processing...", {
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

      toast.success("Transaction successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const {logs} = receipt;
      const portfolioEvents = logs.filter(obj => obj.address.toLocaleLowerCase() == localStorage.getItem("portfolioManager")?.toLocaleLowerCase());
      portfolioEvents.forEach(event => {
        const decodedEvent = ethers.utils.defaultAbiCoder.decode(
          ['address', 'uint'],
          event.data
        )
        console.log({decodedEvent})
      })
    },
  });

  useEffect(() => {
    if (localStorage.getItem("portfolioManager")) {
      setShowPortfolio(true);
      const portfolioManagerAddress =
        localStorage.getItem("portfolioManager") || "";
      const contract = new ethers.Contract(
        portfolioManagerAddress,
        portfolioManagerABI.abi,
        provider
      );
      setPortfolioManager(contract);
      getPortfolioTokens(contract);
    }
  }, []);

  async function getPortfolioTokens(contract: any) {
    const numberOfPortfolioTokens = (
      await contract.numberOfTokens()
    ).toNumber();
    const portfolioTokens: any = [];
    for (let i = 0; i < numberOfPortfolioTokens; i++) {
      const address = await contract.portfolioTokens(i);
      assets.forEach((ass) => {
        if (ass.address == address) {
          portfolioTokens.push(ass);
        }
      });
    }
    setPortfolioAssets(portfolioTokens);
    const balance = await getTokenBalance(
      "0x29FeC84bED2D86A7d520F26275D61fc635Ab381e"
    );
    setFundingTokenBalance(parseFloat(balance.toString()));

    setPortfolioBalance(portfolioTokens);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleAutobalance() {
    setAutoBalance(!autoBalance);
  }

  async function getTokenBalance(address: string) {
    const providerUrl =
      "https://polygon-mumbai.g.alchemy.com/v2/EV43LGYLxvW7eOpMCuopojpLRrhwrR6Y";

    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const portfolioManagerAddress =
      localStorage.getItem("portfolioManager") || "";
    const erc20 = new ethers.Contract(address, ERC20.abi, provider);
    const balance = await erc20.balanceOf(portfolioManagerAddress);
    const decimals = await erc20.decimals();
    const readableBalance = ethers.utils.formatUnits(
      balance.toString(),
      decimals.toString()
    );
    return readableBalance;
  }

  async function setPortfolioBalance(portfolioTokens: any) {
    let list: any = [];
    for (let i = 0; i < portfolioTokens.length; i++) {
      const balance = await getTokenBalance(portfolioTokens[i].address);
      list.push(parseFloat(balance.toString()));
    }
    setPortfolioBalanceList(list);
  }

  const balancePortfolio = async () => {
    writeAsync?.();
  };

  return (
    <>
      {!showPortfolio ? (
        <div>
          <div
            style={{
              background: "#aaa",
              borderRadius: "20px",
              padding: "100px",
              alignItems: "center",
              textAlign: "center",
              fontSize: "20px",
            }}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <p>+</p>
            <p>create a fund</p>
          </div>

          {modalIsOpen && (
            <CreateFundModal
              closeModal={closeModal}
              setShowPortfolio={setShowPortfolio}
              setPortfolioManager={setPortfolioManager}
            />
          )}
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "50%",
              }}
            >
              <h1
                style={{
                  fontSize: "36px",
                }}
              >
                My Portfolio
              </h1>
              <p
                style={{
                  alignItems: "center",
                  alignSelf: "center",
                  margin: "7px 40px",
                  fontSize: "24px",
                }}
              >
                $0.00
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "20px",
              alignItems: "center",
              textAlign: "center",
              fontSize: "20px",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ width: "50%" }}>
                <h2 style={{ textAlign: "left" }}>Funding Asset</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  width: "50%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "center",
                  }}
                >
                  <p>auto balance</p>
                  <Switch onChange={handleAutobalance} checked={autoBalance} />
                </div>
                <button
                  style={{ margin: "0 10px", fontSize: "20px" }}
                  onClick={() => {
                    setDepositPopup(true);
                  }}
                >
                  + deposit USDC
                </button>
                <button style={{ margin: "0 10px", fontSize: "20px" }}>
                  withdraw USDC
                </button>
              </div>
            </div>
            <div
              style={{
                background: "#ccc",
                borderRadius: "20px",
                padding: "50px 0",
                alignItems: "center",
                textAlign: "center",
                fontSize: "20px",
                width: "20%",
                margin: "20px 0",
              }}
            >
              <img
                style={{
                  width: "70px",
                  borderRadius: "50%",
                }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlo33PdWtxav-AZbMVEddFKHcugmZgjEje0R1ewI&s"
              />
              <p>{fundingTokenBalance} USDC</p>
              <p>$0.00</p>
            </div>
            {depositPopup && (
              <DepositUSDCPopup
                closeModal={() => {
                  setDepositPopup(false);
                }}
                setShowPortfolio={setShowPortfolio}
                setPortfolioManager={setPortfolioManager}
                setFundingTokenBalance={setFundingTokenBalance}
              />
            )}
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "20px",
              alignItems: "center",
              textAlign: "center",
              fontSize: "20px",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ width: "50%" }}>
                <h2 style={{ textAlign: "left" }}>Portfolio Assets</h2>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  width: "50%",
                }}
              >
                <button
                  style={{ margin: "0 10px", fontSize: "20px" }}
                  onClick={() => {}}
                >
                  Withdraw All Assets
                </button>
                <button
                  style={{ margin: "0 10px", fontSize: "20px" }}
                  onClick={balancePortfolio}
                >
                  balance portfolio
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {portfolioAssets.map((ass: any, ind) => {
                getTokenBalance(ass.address);
                return (
                  <div
                    style={{
                      background: "#ccc",
                      borderRadius: "20px",
                      padding: "60px 0",
                      alignItems: "center",
                      textAlign: "center",
                      fontSize: "20px",
                      width: "20%",
                      margin: "20px",
                    }}
                  >
                    <img
                      style={{
                        width: "70px",
                        borderRadius: "50%",
                      }}
                      src={ass.image}
                    />
                    <p>
                      {portfolioBalanceList[ind]} {ass.name}
                    </p>
                    <p>$0.00</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
