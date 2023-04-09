import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getNetwork } from "@wagmi/core";

export function Navbar() {
  const { chain: currentChain }: any = getNetwork();

  console.log(currentChain);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        background: "#49abf5",
        margin: "20px",
        borderRadius: "20px",
        color: "white",
      }}
    >
      <div
        style={{
          width: "30%",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            listStyleType: "none",
            height: "100%",
            textAlign: "center",
            alignItems: "center",
            fontSize: "22px",
          }}
        >
          <li style={{ width: "33%", cursor: "pointer" }}>Dashboard</li>
          <li style={{ width: "33%", cursor: "pointer" }}>Activity</li>
          <li style={{ width: "33%", cursor: "pointer" }}>Analytics</li>
        </ul>
      </div>
      <div
        style={{
          fontSize: "32px",
          textAlign: "center",
          width: "40%",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            padding: "2%",
            fontSize: "45px",
          }}
        >
          ManageX
        </h2>
      </div>
      <div
        style={{
          width: "30%",
          alignItems: "center",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <div
          style={{
            borderRadius: "30%",
            width: "50px",
            height: "50px",
            margin: "auto 20px",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "80%",
            padding: "20px",
          }}
        >
          {/* <ConnectButton showBalance={false} accountStatus={"address"} chainStatus={"full"} /> */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                              border: "none",
                              background: "#0c617a",
                              color: "white",
                              fontSize: "18px",
                              cursor: "pointer",
                          }}
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button" style={{
                            padding: "10px",
                            borderRadius: "10px",
                              border: "none",
                              background: "#0c617a",
                              color: "white",
                              fontSize: "18px",
                              cursor: "pointer",
                        }}>
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <div>
                          <button
                            onClick={openChainModal}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "10px",
                              borderRadius: "10px",
                              border: "none",
                              background: "#0c617a",
                              color: "white",
                              boxShadow: "0 0 10px white",
                              fontSize: "18px",
                              cursor: "pointer"

                            }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 16,
                                  height: 16,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    style={{ width: 16, height: 16 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>
                        </div>

                        <div>
                          <button
                            onClick={openAccountModal}
                            type="button"
                            style={{
                              padding: "10px",
                              borderRadius: "10px",
                              border: "none",
                              background: "#0c617a",
                              color: "white",
                              boxShadow: "0 0 10px white",
                              fontSize: "18px",
                              cursor: "pointer"
                            }}
                          >
                            {account.displayName}
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </div>
  );
}
