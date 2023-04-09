import { sign } from "crypto";
import { ethers } from "ethers";
import React, { useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useSigner } from "wagmi";
import portfolioManagerABI from "../../abis/portfolioManager.json";
import { assets } from "@/constants/assets";

export const CreateFundModal = ({ closeModal, setShowPortfolio, setPortfolioManager }: any) => {
  const [selectedAssets, setSelectedAssets] = useState([0, 0, 0, 0, 0]);
  const [assetList, setAssetList] = useState(assets);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const privateKey =
      "fcc1c44ed69481c36eaa1332fcdfdee407ba575623a7066de76cfb80d1e25e37";
    const providerUrl =
      "https://polygon-mumbai.g.alchemy.com/v2/EV43LGYLxvW7eOpMCuopojpLRrhwrR6Y";

    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const signer = new ethers.Wallet(privateKey, provider);

    const factory = new ethers.ContractFactory(
      portfolioManagerABI.abi,
      portfolioManagerABI.bytecode
    );

    const portfolioTokens: any = [];
    const fundingToken = "0x29FeC84bED2D86A7d520F26275D61fc635Ab381e";
    selectedAssets.forEach((val, ind) => {
      if (val == 1) {
        portfolioTokens.push(assetList[ind].address);
      }
    });
    setLoading(true);
    const contract = await factory
      .connect(signer)
      .deploy(portfolioTokens, fundingToken);
    setLoading(false);
    closeModal();
    console.log(contract);
    setShowPortfolio(true);
    setPortfolioManager(contract);
    localStorage.setItem("portfolioManager", contract.address)
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
            <h1>Select Portfolio Assets</h1>
            <div
              style={{
                marginLeft: "40%",
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
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {assetList.map((ass, ind) => {
                  return (
                    <div key={ind} className={"asset-element"}>
                      <img
                        style={{
                          width: "40px",
                          borderRadius: "50%",
                        }}
                        src={ass.image}
                      />
                      <p>{ass.name}</p>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const list = selectedAssets;
                          if (list[ind]) {
                            list[ind] = 0;
                          } else {
                            list[ind] = 1;
                          }
                          setSelectedAssets(list);
                          console.log(list);
                          console.log(e.target.value);
                        }}
                      />
                    </div>
                  );
                })}
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
          ) : (
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#49abf5"
                    ariaLabel="ball-triangle-loading"
                    visible={true}
                />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <p style={{fontSize: "20px"}}>Transaction processing...</p>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
