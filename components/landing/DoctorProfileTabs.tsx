import React, { useState, useRef, useEffect } from "react";
import { useIsMobile } from "../../hooks/use-mobile";

const tabList = ["Feedback", "Services", "Education", "Other Info", "FAQs"];

export default function DoctorProfileTabs() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Scroll active tab into view when tab changes or on mobile
  useEffect(() => {
    if (tabsRef.current && isMobile) {
      const activeTabElement = tabsRef.current.children[activeTab] as HTMLElement;
      if (activeTabElement) {
        const scrollLeft = activeTabElement.offsetLeft - tabsRef.current.offsetWidth / 2 + activeTabElement.offsetWidth / 2;
        tabsRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeTab, isMobile]);
  
  return (
    <div style={{ 
      width: "100%", 
      display: "flex", 
      flexDirection: "column", 
      marginTop: isMobile ? 16 : 32 
    }}>
      <div 
        ref={tabsRef}
        style={{ 
          display: "flex", 
          gap: isMobile ? 24 : 64, 
          marginLeft: 0, 
          padding: 0,
          overflowX: isMobile ? "auto" : "visible",
          msOverflowStyle: "none",  /* IE and Edge */
          scrollbarWidth: "none",   /* Firefox */
          WebkitOverflowScrolling: "touch",
          paddingBottom: isMobile ? 8 : 0,
          maxWidth: "100%"
        }}
      >
        {tabList.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              cursor: "pointer",
              fontSize: isMobile ? 16 : 18,
              fontWeight: 500,
              color: "#414141",
              position: "relative",
              paddingBottom: 8,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                borderBottom: activeTab === idx ? "3px solid #003F31" : "none",
                width: "100%",
                display: "inline-block",
                paddingBottom: activeTab === idx ? 4 : 0,
                transition: "border-bottom 0.2s",
              }}
            >
              {tab}
            </span>
          </button>
        ))}
      </div>
      {/* Feedback content shown only when Feedback tab is selected */}
      {activeTab === 0 && (
        <div style={{ width: "100%", marginTop: isMobile ? 24 : 42 }}>
          <div style={{ 
            fontSize: isMobile ? 18 : 22, 
            fontWeight: 600, 
            color: "#414141", 
            marginBottom: isMobile ? 12 : 16,
            paddingRight: isMobile ? 8 : 0
          }}>
            Dr. Shazia Humayun Malik's Reviews (75)
          </div>
          <div style={{ 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row", 
            alignItems: isMobile ? "center" : "flex-start", 
            justifyContent: "space-between",
            gap: isMobile ? 24 : 0 
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              minWidth: isMobile ? "auto" : 180,
              justifyContent: isMobile ? "center" : "flex-start",
              width: isMobile ? "100%" : "auto"
            }}>
              <div style={{
                height: isMobile ? 56 : 64,
                width: isMobile ? 56 : 64,
                borderRadius: "50%",
                background: "#01503F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "normal",
                fontSize: isMobile ? 14 : 16,
                marginRight: 16,
              }}>
                100%
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 14, color: "#52525B" }}>Satisfied out of 75</div>
                <div style={{ fontSize: 14, color: "#52525B" }}>Patients</div>
              </div>
            </div>
            <div style={{ 
              maxWidth: isMobile ? "100%" : 350, 
              marginLeft: isMobile ? 0 : "auto",
              width: isMobile ? "100%" : "auto"
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 24 }}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: isMobile ? 10 : 18 
                }}>
                  <span style={{ 
                    width: isMobile ? 100 : 120, 
                    fontSize: 14, 
                    color: "#52525B", 
                    whiteSpace: "nowrap" 
                  }}>Doctor Checkup</span>
                  <div style={{ 
                    width: isMobile ? "calc(100% - 150px)" : 150, 
                    height: 8, 
                    borderRadius: 4, 
                    background: "#01503F", 
                    alignSelf: "center", 
                    flexGrow: isMobile ? 1 : 0 
                  }}></div>
                  <span style={{ 
                    width: 36, 
                    textAlign: "right", 
                    fontSize: 14, 
                    color: "#222" 
                  }}>98%</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: isMobile ? 10 : 18 
                }}>
                  <span style={{ 
                    width: isMobile ? 100 : 120, 
                    fontSize: 14, 
                    color: "#52525B", 
                    whiteSpace: "nowrap" 
                  }}>Clinic Environment</span>
                  <div style={{ 
                    width: isMobile ? "calc(100% - 150px)" : 150, 
                    height: 8, 
                    borderRadius: 4, 
                    background: "#01503F", 
                    alignSelf: "center", 
                    flexGrow: isMobile ? 1 : 0 
                  }}></div>
                  <span style={{ 
                    width: 36, 
                    textAlign: "right", 
                    fontSize: 14, 
                    color: "#222" 
                  }}>98%</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: isMobile ? 10 : 18 
                }}>
                  <span style={{ 
                    width: isMobile ? 100 : 120, 
                    fontSize: 14, 
                    color: "#52525B", 
                    whiteSpace: "nowrap" 
                  }}>Staff Behaviour</span>
                  <div style={{ 
                    width: isMobile ? "calc(100% - 150px)" : 150, 
                    height: 8, 
                    borderRadius: 4, 
                    background: "#01503F", 
                    alignSelf: "center", 
                    flexGrow: isMobile ? 1 : 0 
                  }}></div>
                  <span style={{ 
                    width: 36, 
                    textAlign: "right", 
                    fontSize: 14, 
                    color: "#222" 
                  }}>98%</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ 
            marginTop: isMobile ? 24 : 32, 
            maxWidth: isMobile ? "100%" : 400,
            width: "100%" 
          }}>
            <div style={{ 
              borderRadius: 12, 
              border: "1px solid #CDCDCD", 
              padding: 16, 
              background: "#fff" 
            }}>
              <div style={{ fontSize: 14, color: "#414141" }}>
                One of the best surgeons! 100% recommended
              </div>
              <div style={{ fontSize: 14, color: "#676767", marginTop: 4 }}>
                Verified patient: S**a · 5 months ago
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add this CSS for hiding scrollbar but keeping scroll functionality
const scrollbarStyles = `
  div[style*="overflow-x: auto"]::-webkit-scrollbar {
    display: none;
  }
`;

// Add the style to the document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = scrollbarStyles;
  document.head.appendChild(style);
}
